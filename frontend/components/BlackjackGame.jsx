import React, { useState } from "react";
import "./BlackjackGame.css";

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
    const newDeck = initializeDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setMessage("");
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
    }
  };

  const stand = () => {
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
    } else if (playerValue < dealerValue) {
      setMessage("You lose.");
    } else {
      setMessage("It's a tie.");
    }
  };

  return (
    <div className="blackjack-game">
      <h1>Blackjack</h1>
      <button onClick={startGame}>Start Game</button>
      <div className="hands">
        <div className="hand">
          <h2>Player's Hand</h2>
          <div className="cards">
            {playerHand.map((card, index) => (
              <div key={index} className="card">
                {card.value}{card.suit}
              </div>
            ))}
          </div>
          <p>Value: {calculateHandValue(playerHand)}</p>
        </div>
        <div className="hand">
          <h2>Dealer's Hand</h2>
          <div className="cards">
            {dealerHand.map((card, index) => (
              <div key={index} className="card">
                {card.value}{card.suit}
              </div>
            ))}
          </div>
          <p>Value: {calculateHandValue(dealerHand)}</p>
        </div>
      </div>
      <div className="controls">
        <button onClick={hit} disabled={message !== ""}>Hit</button>
        <button onClick={stand} disabled={message !== ""}>Stand</button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
};

export default BlackjackGame;