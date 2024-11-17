import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [balance, setBalance] = useState(0); // User's wallet balance
  const [bet, setBet] = useState(10); // Bet amount
  const [message, setMessage] = useState('');
  const [gameStatus, setGameStatus] = useState('idle'); // Game status
  const [tiles, setTiles] = useState([]); // Game grid/tiles
  const [revealedTiles, setRevealedTiles] = useState([]); // Revealed tiles
  const [mines, setMines] = useState([]); // Positions of mines

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
        headers: { Authorization: `Bearer ${token}` },
      });

      // Assuming the backend sends balance in rupees. If it's in dollars, apply conversion.
      const userBalance = response.data.balance; // Ensure this is in ₹
      setBalance(userBalance); // Display the correct value
    } catch (error) {
      console.error('Error fetching balance:', error.response?.data || error.message);
      setMessage('Error fetching balance. Please try again.');
    }
  };

  const updateBalance = async (adjustment, gameResult) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token not found. Please log in again.');
        return false;
      }

      const response = await axios.post(
        'http://localhost:3000/wallet/update',
        {
          balance: balance + adjustment, // Adjust balance
          gameResult,
          betAmount: Math.abs(adjustment), // Log the bet amount
        },
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );

      await fetchBalance(); // Synchronize balance
      return true;
    } catch (error) {
      console.error('Error updating balance:', error.response?.data || error.message);
      setMessage('Error updating balance. Please try again.');
      return false;
    }
  };

  const startGame = async () => {
    if (bet > balance) {
      setMessage('Insufficient balance. Please lower your bet.');
      return;
    }

    const success = await updateBalance(-bet, 'bet');
    if (!success) {
      setMessage('Failed to place bet. Try again.');
      return;
    }

    initializeGame();
  };

  const initializeGame = () => {
    const gridSize = 5; // Example 5x5 grid
    const mineCount = 5; // Example number of mines

    const allTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    const shuffledTiles = [...allTiles].sort(() => Math.random() - 0.5);
    const minePositions = shuffledTiles.slice(0, mineCount);

    setTiles(allTiles);
    setMines(minePositions);
    setRevealedTiles([]);
    setGameStatus('playing');
    setMessage('Game started! Avoid the mines.');
  };

  const revealTile = async (tile) => {
    if (gameStatus !== 'playing' || revealedTiles.includes(tile)) return;

    if (mines.includes(tile)) {
      setGameStatus('lost');
      setMessage('You hit a mine! Game over.');
      await updateBalance(0, 'lost'); // Backend tracks loss
    } else {
      const newRevealedTiles = [...revealedTiles, tile];
      setRevealedTiles(newRevealedTiles);

      // Check win condition
      if (newRevealedTiles.length === tiles.length - mines.length) {
        const winnings = bet * 2; // Example winnings: double the bet
        setGameStatus('won');
        setMessage(`You won! Winnings: ₹${winnings}`);
        await updateBalance(winnings, 'won');
      }
    }
  };

  const resetGame = () => {
    setGameStatus('idle');
    setTiles([]);
    setMines([]);
    setRevealedTiles([]);
    setMessage('');
  };

  return (
    <div className="mines-container">
      <div className="wallet-info">
        <h2>Balance: ₹{balance}</h2>
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Math.max(1, Number(e.target.value)))}
          disabled={gameStatus === 'playing'}
        />
        <button onClick={startGame} disabled={gameStatus === 'playing'}>
          Start Game
        </button>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="game-grid">
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => revealTile(tile)}
            disabled={revealedTiles.includes(tile) || gameStatus !== 'playing'}
            className={revealedTiles.includes(tile) ? 'revealed' : ''}
          >
            {revealedTiles.includes(tile)
              ? mines.includes(tile)
                ? '💣'
                : '✅'
              : ''}
          </button>
        ))}
      </div>

      {gameStatus !== 'playing' && gameStatus !== 'idle' && (
        <button onClick={resetGame}>Reset Game</button>
      )}

      <style jsx>{`
        .mines-container {
          text-align: center;
          margin: 20px;
        }

        .wallet-info {
          margin-bottom: 20px;
        }

        .game-grid {
          display: grid;
          grid-template-columns: repeat(5, 50px);
          gap: 10px;
          justify-content: center;
        }

        .game-grid button {
          width: 50px;
          height: 50px;
          font-size: 18px;
        }

        .revealed {
          background-color: #ddd;
        }

        .message {
          margin: 10px 0;
          font-size: 16px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default App;
