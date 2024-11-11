import React, { useState } from "react";
import "./BlackjackGame.css";
import { motion } from "framer-motion";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getCardValue = (card) => {
  if (card.value === "A") return 11;
  if (["K", "Q", "J"].includes(card.value)) return 10;
  return parseInt(card.value);
};

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [gameKey, setGameKey] = useState(0);
  const [showDealerSecondCard, setShowDealerSecondCard] = useState(false);

  const initializeDeck = () => {
    const newDeck = [];
    for (let suit of suits) {
      for (let value of values) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    if (bet < 0 || bet > balance) {
      setMessage("Invalid bet amount.");
      return;
    }
    const newDeck = initializeDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setMessage("");
    setGameKey(prevKey => prevKey + 1); // Update the game key to force re-render
    setShowDealerSecondCard(false); // Hide dealer's second card
  };

  const calculateHandValue = (hand) => {
    let value = hand.reduce((acc, card) => acc + getCardValue(card), 0);
    let aces = hand.filter(card => card.value === "A").length;
    while (value > 21 && aces) {
      value -= 10;
      aces -= 1;
    }
    return value;
  };

  const hit = () => {
    const newDeck = [...deck];
    const newPlayerHand = [...playerHand, newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    if (calculateHandValue(newPlayerHand) > 21) {
      setMessage("Bust! You lose.");
      setBalance(balance - bet);
    }
  };

  const stand = () => {
    setShowDealerSecondCard(true); // Show dealer's second card
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand = [...newDealerHand, newDeck.pop()];
    }
    setDeck(newDeck);
    setDealerHand(newDealerHand);

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      setMessage("You win!");
      setBalance(balance + bet);
    } else if (playerValue < dealerValue) {
      setMessage("You lose.");
      setBalance(balance - bet);
    } else {
      setMessage("It's a tie.");
    }
  };

  return (
    <div className="blackjack-game">
      <div className="sidebar">
        <h1>Blackjack</h1>
        <div>
          <label>
            Bet Amount: 
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              className="bet-input"
            />
          </label>
        </div>
        <motion.button
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          style={{ backgroundColor: "#2563eb", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
        >
          Start Game
        </motion.button>
        <p>Balance: ${balance}</p>
        <div className="statistics">
          <p>Statistics:</p>
          <p>Players win approximately 44% of the time.</p>
          <p>The house wins approximately 56% of the time.</p>
        </div>
      </div>
      <div className="hands">
        <div className="hand">
          <h2>Dealer's Hand</h2>
          <div className="cards">
            {dealerHand.map((card, index) => (
              <motion.div
                key={`${gameKey}-dealer-${index}`}
                className={`card ${card.suit === "♥" || card.suit === "♦" ? "red" : "black"} ${index === 1 && !showDealerSecondCard ? "face-down" : ""}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {index === 1 && !showDealerSecondCard ? "Gambler's Dilemma" : `${card.value}${card.suit}`}
              </motion.div>
            ))}
          </div>
          <p>Value: {calculateHandValue(dealerHand)}</p>
        </div>
        <div className="hand">
          <h2>Player's Hand</h2>
          <div className="cards">
            {playerHand.map((card, index) => (
              <motion.div
                key={`${gameKey}-player-${index}`}
                className={`card ${card.suit === "♥" || card.suit === "♦" ? "red" : "black"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {card.value}{card.suit}
              </motion.div>
            ))}
          </div>
          <p>Value: {calculateHandValue(playerHand)}</p>
        </div>
        <div className="controls">
          <motion.button
            onClick={hit}
            disabled={message !== ""}
            whileHover={{ scale: 1.05 }}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "1rem 2rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s", marginRight: "20px" }}
          >
            Hit
          </motion.button>
          <motion.button
            onClick={stand}
            disabled={message !== ""}
            whileHover={{ scale: 1.05 }}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "1rem 2rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
          >
            Stand
          </motion.button>
        </div>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default BlackjackGame;