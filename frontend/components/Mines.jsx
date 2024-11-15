import React, { useState } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 5;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateGrid = (numMines) => {
  const totalTiles = GRID_SIZE * GRID_SIZE;
  if (numMines >= totalTiles) {
    numMines = totalTiles - 1;
  }
  
  // Create array with mines (true) and safe tiles (false)
  const grid = Array(numMines).fill(true)
    .concat(Array(totalTiles - numMines).fill(false));
  
  // Shuffle the array to randomize mine positions
  return shuffleArray(grid);
};

const calculateMultiplier = (numMines, safeRevealed) => {
  const totalTiles = GRID_SIZE * GRID_SIZE;
  const safeTiles = totalTiles - numMines;
  const baseMultiplier = (totalTiles / (totalTiles - numMines));
  return Math.pow(baseMultiplier, safeRevealed).toFixed(2);
};

const Mines = () => {
  const [numMines, setNumMines] = useState(5);
  const [grid, setGrid] = useState(generateGrid(numMines));
  const [revealed, setRevealed] = useState(Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [safeCount, setSafeCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMultiplier = calculateMultiplier(numMines, safeCount);
  const potentialWin = (bet * currentMultiplier).toFixed(2);

  const handleTileClick = (index) => {
    if (!isPlaying || gameOver || revealed[index]) return;
  
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  
    if (grid[index]) {
      setGameOver(true);
      setIsPlaying(false);
    } else {
      setSafeCount(prev => prev + 1);
    }
  };

  const handleStartGame = () => {
    if (bet > balance || bet <= 0) return;
    setIsPlaying(true);
    setBalance(prev => prev - bet); 
    handleRestart();
  };

  const handleCashout = () => {
    if (!isPlaying || gameOver) return;
    const winnings = bet * currentMultiplier;
    setBalance(prev => prev + Number(winnings));
    setGameOver(true);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setGrid(generateGrid(numMines));
    setRevealed(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setGameOver(false);
    setSafeCount(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameCard}>
        <h2 style={styles.title}>Mines</h2>

        <div style={styles.gameInfo}>
          <div style={styles.balanceDisplay}>Balance: ${balance.toFixed(2)}</div>
          <div style={styles.multiplierDisplay}>
            Multiplier: {currentMultiplier}x
          </div>
          {isPlaying && (
            <div style={styles.potentialWin}>
              Potential Win: ${potentialWin}
            </div>
          )}
        </div>

        <div style={styles.grid}>
          {grid.map((mine, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: !revealed[index] && isPlaying ? 1.05 : 1 }}
              style={styles.tile}
              className={`${revealed[index] ? (mine ? "mine" : "safe") : ""}`}
              onClick={() => handleTileClick(index)}
            >
              {revealed[index] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {mine ? "💣" : "💎"}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div style={styles.controls}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Bet Amount
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                style={styles.input}
                disabled={isPlaying}
                min="0"
                max={balance}
              />
            </label>
            <label style={styles.label}>
              Number of Mines
              <input
                type="number"
                value={numMines}
                onChange={(e) => setNumMines(Number(e.target.value))}
                style={styles.input}
                disabled={isPlaying}
                min="1"
                max={(GRID_SIZE * GRID_SIZE) - 1}
              />
            </label>
          </div>

          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              style={styles.button}
              onClick={handleStartGame}
              disabled={bet > balance || bet <= 0}
            >
              Start Game
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              style={{...styles.button, backgroundColor: '#10B981'}}
              onClick={handleCashout}
              disabled={gameOver}
            >
              Cash Out
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #A4D7E1, #FFFFFF)",
    padding: "6rem 1rem",
  },
  gameCard: {
    maxWidth: "600px", 
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "1.5rem", 
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#004D4D",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  gameInfo: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#475569",
  },
  balanceDisplay: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#004D4D",
    marginBottom: "0.5rem",
  },
  multiplierDisplay: {
    fontSize: "1.1rem",
    color: "#004D4D",
    marginBottom: "0.5rem",
  },
  potentialWin: {
    fontSize: "1.1rem",
    color: "#10B981",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
    gap: "0.25rem",
    marginBottom: "1.5rem",
    maxWidth: "400px", 
    margin: "0 auto",
  },
  
  tile: {
    aspectRatio: "1",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.375rem", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem", 
    cursor: "pointer",
    border: "1px solid #004D4D", 
    transition: "all 0.2s",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
    gap: "0.75rem",
    marginBottom: "0.75rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    color: "#475569",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #E2E8F0",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#004D4D",
    color: "#FFFFFF",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
};

export default Mines;