// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState(1000); // Initial wallet balance
  const [betAmount, setBetAmount] = useState(0);
  const [numMines, setNumMines] = useState(3); // Default number of mines
  const [grid, setGrid] = useState([]);
  const [gameStatus, setGameStatus] = useState("waiting"); // "waiting" | "running" | "lost" | "won"
  const [multiplier, setMultiplier] = useState(1.1); // Start multiplier slightly above 1
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [profit, setProfit] = useState(0);
  const [finalMultiplier, setFinalMultiplier] = useState(null); // Store the final multiplier at cash out

  // Start the game and set mines
  const startGame = () => {
    if (betAmount > 0 && betAmount <= wallet) {
      setGameStatus("running");
      setMultiplier(1.1); // Start multiplier from 1.1
      setRevealedTiles([]);
      setProfit(0);
      setFinalMultiplier(null);
      setGrid(generateGrid());
    }
  };

  // Generate a grid with mines randomly placed
  const generateGrid = () => {
    const gridSize = 25;
    let mines = Array(gridSize).fill(false);
    let minePositions = new Set();
    while (minePositions.size < numMines) {
      minePositions.add(Math.floor(Math.random() * gridSize));
    }
    minePositions.forEach((pos) => (mines[pos] = true));
    return mines;
  };

  // Handle clicking on a tile
  const revealTile = (index) => {
    if (gameStatus !== "running" || revealedTiles.includes(index)) return;

    if (grid[index]) {
      // Hit a mine
      setGameStatus("lost");
    } else {
      // Safe tile
      setRevealedTiles((prev) => [...prev, index]);
      const newMultiplier = calculateMultiplier();
      setMultiplier(newMultiplier);
    }
  };

  // Function to calculate multiplier based on revealed tiles and number of mines
  const calculateMultiplier = () => {
    const baseMultiplier = 1.1; // Start multiplier slightly above 1
    const revealedCount = revealedTiles.length;

    // Adjust growth factors based on the number of mines
    const minimumGrowth = 0.05; // Minimum increase per tile for all games
    const mineFactor = numMines > 2 ? 0.25 + (numMines - 3) * 0.25 : 0.15; // Adjust for lower mine counts
    const multiplier = baseMultiplier + revealedCount * (minimumGrowth + mineFactor);

    return Math.max(multiplier, 1.1).toFixed(2); // Ensure minimum multiplier to avoid negative profit
  };

  // Cash out and collect profit
  const cashOut = () => {
    if (gameStatus === "running") {
      setGameStatus("won");
      const finalMultiplier = calculateMultiplier();
      setFinalMultiplier(finalMultiplier);

      // Calculate profit
      const currentProfit = (betAmount * finalMultiplier - betAmount).toFixed(2);
      setProfit(currentProfit);

      // Update wallet balance after cashout
      setWallet(wallet + parseFloat(currentProfit));
    }
  };

  return (
    <div className="container">
      {/* Wallet display */}
      <div className="wallet">
        Wallet: ₹{wallet.toFixed(2)}
      </div>

      <h1 className="title">Mines Game</h1>

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
        <input
          type="number"
          min="1"
          max="24"
          value={numMines}
          onChange={(e) => setNumMines(Number(e.target.value))}
          placeholder="Number of Mines"
          className="mine-input"
        />
      </div>

      <div className={`multiplier ${gameStatus}`}>
        {gameStatus === "waiting" ? "–" : `${multiplier}x`}
      </div>

      {gameStatus === "lost" && (
        <div className="message">You hit a mine! Game Over.</div>
      )}
      {gameStatus === "won" && (
        <div className="message success">
          You cashed out at {finalMultiplier}x! <br />
          Profit: ₹{profit}
        </div>
      )}

      <div className="grid">
        {grid.map((isMine, index) => (
          <button
            key={index}
            className={`tile ${revealedTiles.includes(index) ? "revealed" : ""}`}
            onClick={() => revealTile(index)}
            disabled={gameStatus !== "running"}
          >
            {revealedTiles.includes(index) ? (isMine ? "💣" : "✅") : ""}
          </button>
        ))}
      </div>

      <div className="buttons">
        {(gameStatus === "waiting" || gameStatus === "lost" || gameStatus === "won") ? (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <button className="cashout-btn" onClick={cashOut}>
            Cash Out
          </button>
        )}
      </div>
    </div>
  );
}

export default App;