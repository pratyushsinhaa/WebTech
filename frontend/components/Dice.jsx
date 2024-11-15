// DiceGame.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../components/walletContext';

const DiceGame = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(2);
  const [result, setResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const { balance, updateBalance } = useWallet();

  // Calculate multiplier based on slider position
  useEffect(() => {
    const newMultiplier = (100 / sliderValue).toFixed(2);
    setMultiplier(newMultiplier);
  }, [sliderValue]);

  const handleRoll = async () => {
    if (isRolling || betAmount > balance) return;
    
    setIsRolling(true);
    const randomNumber = Math.random() * 100;
    const won = randomNumber <= sliderValue;
    
    // Simulate roll animation
    setTimeout(() => {
      setResult({
        won,
        number: randomNumber.toFixed(2),
        payout: won ? betAmount * multiplier : 0
      });
      
      // Update wallet
      updateBalance(balance + (won ? betAmount * (multiplier - 1) : -betAmount));
      setIsRolling(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameCard}>
        <h2 style={styles.title}>Dice</h2>
        
        {/* Slider Section */}
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="98"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            style={styles.slider}
          />
          <div style={styles.sliderInfo}>
            <div>
              <span style={styles.label}>Roll Under</span>
              <span style={styles.value}>{sliderValue}%</span>
            </div>
            <div>
              <span style={styles.label}>Multiplier</span>
              <span style={styles.value}>{multiplier}x</span>
            </div>
            <div>
              <span style={styles.label}>Win Chance</span>
              <span style={styles.value}>{sliderValue}%</span>
            </div>
          </div>
        </div>

        {/* Bet Controls */}
        <div style={styles.betControls}>
          <div style={styles.betAmount}>
            <span style={styles.label}>Bet Amount</span>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            onClick={handleRoll}
            disabled={isRolling || betAmount > balance}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </motion.button>
        </div>

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...styles.result,
              backgroundColor: result.won ? '#10b981' : '#ef4444'
            }}
          >
            <span style={styles.resultNumber}>{result.number}</span>
            <span style={styles.resultText}>
              {result.won ? `Won ${result.payout.toFixed(2)}` : 'Lost'}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
    padding: "6rem 1rem",
  },
  gameCard: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "2rem",
  },
  sliderContainer: {
    marginBottom: "2rem",
  },
  slider: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    outline: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
  },
  sliderInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  label: {
    color: "#64748b",
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
  },
  value: {
    color: "#1e293b",
    fontWeight: "600",
  },
  betControls: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-end",
    marginBottom: "2rem",
  },
  betAmount: {
    flex: 1,
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #e2e8f0",
    outline: "none",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
  result: {
    padding: "1rem",
    borderRadius: "0.5rem",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultNumber: {
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  resultText: {
    fontWeight: "500",
  },
};

export default DiceGame;