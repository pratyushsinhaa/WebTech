// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState(1000);
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [crashPoint, setCrashPoint] = useState(0);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(null);
  const [profit, setProfit] = useState(0);

  // Start the game
  const startGame = () => {
    if (betAmount > 0 && betAmount <= wallet) {
      setGameStatus("running");
      setMultiplier(1.0);
      setCrashPoint(generateCrashPoint());
      setCashOutMultiplier(null);
      setProfit(0); // Reset profit
    }
  };

  // Generate a random crash point for each round
  const generateCrashPoint = () => (Math.random() * 3 + 1).toFixed(2);

  // Handle cash out
  const handleCashOut = () => {
    if (gameStatus === "running" && multiplier < crashPoint) {
      setCashOutMultiplier(multiplier);
      setGameStatus("cashedOut");

      // Calculate and display profit
      const winnings = betAmount * multiplier;
      const profitAmount = winnings - betAmount;
      setProfit(profitAmount);
      
      // Add winnings to wallet (to be implemented in future)
    }
  };

  // Update the multiplier
  useEffect(() => {
    let interval;

    if (gameStatus === "running" && multiplier < crashPoint) {
      interval = setInterval(() => {
        setMultiplier((prev) => (prev * 1.02).toFixed(2));
      }, 100);
    } else if (multiplier >= crashPoint) {
      setGameStatus("crashed");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStatus, multiplier, crashPoint]);

  return (
    <div className="container">
      {/* Wallet display */}
      <div className="wallet">
        Wallet: ₹{wallet.toFixed(2)}
      </div>

      <h1 className="title">Crash Game</h1>

      {/* Betting input */}
      <div className="betting-area">
        <input
          type="number"
          min="1"
          max={wallet}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          placeholder="Enter Bet Amount"
          className="bet-input"
        />
      </div>

      <div className={`multiplier ${gameStatus}`}>
        {gameStatus === "waiting" ? "–" : `${multiplier}x`}
      </div>

      {gameStatus === "crashed" && (
        <div className="message">Game Crashed at {crashPoint}x</div>
      )}
      {cashOutMultiplier && (
        <div className="message success">
          You cashed out at {cashOutMultiplier}x! <br />
          Profit: ₹{profit.toFixed(2)}
        </div>
      )}

      <div className="buttons">
        {(gameStatus === "waiting" || gameStatus === "crashed" || gameStatus === "cashedOut") ? (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <button className="cashout-btn" onClick={handleCashOut}>
            Cash Out
          </button>
        )}
      </div>
    </div>
  );
}

export default App;