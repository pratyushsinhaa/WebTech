import React, { useState } from "react";
import "./Mines.css";

const GRID_SIZE = 5;

const generateGrid = (numMines) => {
  const grid = Array(GRID_SIZE * GRID_SIZE).fill(false);
  let minesPlaced = 0;

  while (minesPlaced < numMines) {
    const randomIndex = Math.floor(Math.random() * grid.length);
    if (!grid[randomIndex]) {
      grid[randomIndex] = true;
      minesPlaced++;
    }
  }

  return grid;
};

const Mines = () => {
  const [numMines, setNumMines] = useState(5);
  const [grid, setGrid] = useState(generateGrid(numMines));
  const [revealed, setRevealed] = useState(Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [safeCount, setSafeCount] = useState(0);

  const handleTileClick = (index) => {
    if (gameOver || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (grid[index]) {
      setGameOver(true);
    } else {
      setSafeCount(safeCount + 1);
    }
  };

  const handleBetChange = (e) => {
    setBet(Number(e.target.value));
  };

  const handleNumMinesChange = (e) => {
    setNumMines(Number(e.target.value));
  };

  const handleRestart = () => {
    setGrid(generateGrid(numMines));
    setRevealed(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setGameOver(false);
    setSafeCount(0);
  };

  const calculatePayout = () => {
    if (gameOver) return 0;
    const numSafeBoxes = GRID_SIZE * GRID_SIZE - numMines;
    const multiplier = 1 + (numMines / numSafeBoxes);
    return bet * multiplier;
  };

  const handleEndGame = () => {
    if (!gameOver) {
      const payout = calculatePayout();
      setBalance(balance + payout);
      setGameOver(true);
    }
  };

  return (
    <div className="mines-game">
      <div className="sidebar">
        <h1>Mines Game</h1>
        <label>
          Bet Amount:
          <input
            type="number"
            value={bet}
            onChange={handleBetChange}
            className="bet-input"
          />
        </label>
        <label>
          Number of Mines:
          <input
            type="number"
            value={numMines}
            onChange={handleNumMinesChange}
            className="bet-input"
            min="1"
            max={GRID_SIZE * GRID_SIZE - 1}
          />
        </label>
        <p>Balance: ${balance}</p>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleEndGame} disabled={gameOver}>End Game</button>
      </div>
      <div className="grid">
        {grid.map((mine, index) => (
          <div
            key={index}
            className={`tile ${revealed[index] ? (mine ? "mine" : "safe") : ""}`}
            onClick={() => handleTileClick(index)}
          >
            {revealed[index] && (mine ? "💣" : "💎")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mines;