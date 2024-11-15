import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(0);
  const [showDealerCards, setShowDealerCards] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token not found. Please log in again.');
        return;
      }

      const response = await axios.get('http://localhost:3000/wallet', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error.response?.data || error.message);
      setMessage(`Error fetching balance: ${error.response?.data?.message || error.message}`);
    }
  };

  const updateBalance = async (newBalance, result, betAmount) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token not found. Please log in again.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/wallet/update',
        { 
          balance: newBalance,
          gameResult: result,
          betAmount: betAmount
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setBalance(response.data.balance);
      return true;
    } catch (error) {
      console.error('Error updating balance:', error.response?.data || error.message);
      setMessage(`Error updating balance: ${error.response?.data?.message || error.message}`);
      return false;
    }
  };

  const initializeDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck = suits.flatMap(suit => 
      values.map(value => ({ suit, value }))
    );
    
    // Shuffle
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    return newDeck;
  };

  const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    hand.forEach(card => {
      if (card.value === 'A') {
        aces += 1;
        value += 11;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    });

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  const dealCards = async () => {
    if (bet > balance) {
      setMessage('Insufficient balance');
      return;
    }
    if (bet <= 0) {
      setMessage('Invalid bet amount');
      return;
    }

    const newDeck = initializeDeck();
    const newPlayerHand = [newDeck.pop(), newDeck.pop()];
    const newDealerHand = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameStatus('playing');
    setShowDealerCards(false);
    setMessage('');

    // Deduct bet immediately
    const deductResult = await updateBalance(balance - bet, 'bet', bet);
    if (!deductResult) {
      return;
    }

    // Check for blackjack
    if (calculateHandValue(newPlayerHand) === 21) {
      handleGameEnd('blackjack');
    }
  };

  const hit = () => {
    if (gameStatus !== 'playing') return;

    const newDeck = [...deck];
    const card = newDeck.pop();
    const newPlayerHand = [...playerHand, card];
    
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    if (calculateHandValue(newPlayerHand) > 21) {
      handleGameEnd('bust');
    }
  };

  const stand = () => {
    if (gameStatus !== 'playing') return;

    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(newDeck.pop());
    }

    setDeck(newDeck);
    setDealerHand(newDealerHand);
    setShowDealerCards(true);

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    if (dealerValue > 21) {
      handleGameEnd('dealer_bust');
    } else if (dealerValue > playerValue) {
      handleGameEnd('dealer_wins');
    } else if (dealerValue < playerValue) {
      handleGameEnd('player_wins');
    } else {
      handleGameEnd('push');
    }
  };

  const handleGameEnd = async (result) => {
    setGameStatus('finished');
    setShowDealerCards(true);

    let newBalance = balance;
    let message = '';

    switch (result) {
      case 'blackjack':
        newBalance += bet * 2.5;
        message = 'Blackjack! You win!';
        break;
      case 'dealer_bust':
      case 'player_wins':
        newBalance += bet * 2;
        message = 'You win!';
        break;
      case 'push':
        newBalance += bet;
        message = 'Push - your bet is returned';
        break;
      case 'bust':
      case 'dealer_wins':
        message = result === 'bust' ? 'Bust! You lose!' : 'Dealer wins!';
        break;
    }

    const updateResult = await updateBalance(newBalance, result, bet);
    if (updateResult) {
      setMessage(message);
    }
  };

  return (
    <div className="blackjack-container">
      <div className="game-info">
        <div className="balance">Balance: ₹{balance}</div>
        <div className="bet-controls">
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
            disabled={gameStatus === 'playing'}
            className="bet-input"
          />
          <button 
            onClick={dealCards}
            disabled={gameStatus === 'playing' || bet > balance}
            className="game-button"
          >
            Deal
          </button>
        </div>
      </div>

      {message && (
        <div className="message">{message}</div>
      )}

      <div className="game-area">
        <div className="hand dealer-hand">
          <h3>Dealer's Hand ({showDealerCards ? calculateHandValue(dealerHand) : '?'})</h3>
          <div className="cards">
            {dealerHand.map((card, index) => (
              <div 
                key={index}
                className={`card ${(card.suit === '♥' || card.suit === '♦') ? 'red' : 'black'}`}
              >
                {!showDealerCards && index === 1 ? '?' : `${card.value}${card.suit}`}
              </div>
            ))}
          </div>
        </div>

        <div className="hand player-hand">
          <h3>Your Hand ({calculateHandValue(playerHand)})</h3>
          <div className="cards">
            {playerHand.map((card, index) => (
              <div 
                key={index}
                className={`card ${(card.suit === '♥' || card.suit === '♦') ? 'red' : 'black'}`}
              >
                {card.value}{card.suit}
              </div>
            ))}
          </div>
        </div>

        <div className="game-controls">
          <button
            onClick={hit}
            disabled={gameStatus !== 'playing'}
            className="game-button"
          >
            Hit
          </button>
          <button
            onClick={stand}
            disabled={gameStatus !== 'playing'}
            className="game-button"
          >
            Stand
          </button>
        </div>
      </div>

      <style jsx>{`
        .blackjack-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .game-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .balance {
          font-size: 1.2em;
          font-weight: bold;
        }

        .bet-controls {
          display: flex;
          gap: 10px;
        }

        .bet-input {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100px;
        }

        .message {
          padding: 10px;
          margin: 10px 0;
          background: #f8f9fa;
          border-radius: 4px;
          text-align: center;
        }

        .game-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hand {
          margin: 10px 0;
        }

        .cards {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .card {
          width: 60px;
          height: 90px;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2em;
          background: #fff;
        }

        .card.red {
          color: red;
        }

        .card.black {
          color: black;
        }

        .game-controls {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .game-button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
          font-size: 1em;
        }

        .game-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .game-button:hover:not(:disabled) {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default BlackjackGame;