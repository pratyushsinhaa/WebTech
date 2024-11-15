import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Craps = () => {
  const [dice, setDice] = useState([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [point, setPoint] = useState(null);
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [betType, setBetType] = useState('pass');
  const [message, setMessage] = useState('');

  const rollDice = () => {
    if (rolling || bet === 0) return;
    
    setRolling(true);
    setMessage('');
    
    const newDice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];

    setTimeout(() => {
      setDice(newDice);
      setRolling(false);
      handleRollResult(newDice[0] + newDice[1]);
    }, 1000);
  };

  const handleRollResult = (total) => {
    if (!point) {
      // Come out roll
      if (total === 7 || total === 11) {
        if (betType === 'pass') {
          setBalance(prev => prev + bet * 2);
          setMessage('Pass Line wins!');
        } else {
          setMessage('Don\'t Pass Line loses!');
        }
        setBet(0);
      } else if (total === 2 || total === 3 || total === 12) {
        if (betType === 'dontPass') {
          setBalance(prev => prev + bet * 2);
          setMessage('Don\'t Pass Line wins!');
        } else {
          setMessage('Pass Line loses!');
        }
        setBet(0);
      } else {
        setPoint(total);
        setMessage(`Point is ${total}`);
      }
    } else {
      // Point phase
      if (total === point) {
        if (betType === 'pass') {
          setBalance(prev => prev + bet * 2);
          setMessage('Pass Line wins!');
        } else {
          setMessage('Don\'t Pass Line loses!');
        }
        setPoint(null);
        setBet(0);
      } else if (total === 7) {
        if (betType === 'dontPass') {
          setBalance(prev => prev + bet * 2);
          setMessage('Don\'t Pass Line wins!');
        } else {
          setMessage('Pass Line loses!');
        }
        setPoint(null);
        setBet(0);
      }
    }
  };

  const placeBet = (amount) => {
    if (amount <= balance && !rolling) {
      setBet(amount);
      setBalance(prev => prev - amount);
    }
  };

  const renderDie = (value) => {
    return (
      <motion.div
        style={styles.die}
        animate={{
          rotate: rolling ? 360 : 0,
          scale: rolling ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 1 }}
      >
        {value}
      </motion.div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameCard}>
        <h2 style={styles.title}>Craps</h2>
        
        <div style={styles.gameInfo}>
          <div style={styles.balanceDisplay}>Balance: ${balance.toFixed(2)}</div>
          {point && <div>Point: {point}</div>}
          <div>Current Bet: ${bet}</div>
          {message && <div style={styles.message}>{message}</div>}
        </div>

        <div style={styles.diceContainer}>
          {dice.map((die, index) => (
            <motion.div
              key={index}
              style={styles.die}
              animate={{
                rotate: rolling ? 360 : 0,
                scale: rolling ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 1 }}
            >
              {die}
            </motion.div>
          ))}
        </div>

        <div style={styles.bettingControls}>
          <div style={styles.betButtons}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              style={{
                ...styles.button,
                backgroundColor: betType === 'pass' ? '#004D4D' : '#9CA3AF'
              }}
              onClick={() => setBetType('pass')}
              disabled={rolling || bet > 0}
            >
              Pass Line
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              style={{
                ...styles.button,
                backgroundColor: betType === 'dontPass' ? '#004D4D' : '#9CA3AF'
              }}
              onClick={() => setBetType('dontPass')}
              disabled={rolling || bet > 0}
            >
              Don't Pass
            </motion.button>
          </div>

          <div style={styles.betAmounts}>
            {[10, 25, 50, 100].map(amount => (
              <motion.button
                key={amount}
                whileHover={{ scale: 1.05 }}
                style={styles.button}
                onClick={() => placeBet(amount)}
                disabled={rolling || bet > 0 || amount > balance}
              >
                ${amount}
              </motion.button>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            style={{
              ...styles.button,
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: rolling || bet === 0 ? '#9CA3AF' : '#004D4D'
            }}
            onClick={rollDice}
            disabled={rolling || bet === 0}
          >
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </motion.button>
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
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "0.75rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      padding: "2rem",
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
    diceContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      marginBottom: "2rem",
    },
    die: {
      width: "60px",
      height: "60px",
      backgroundColor: "#FFFFFF",
      color: "#004D4D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.5rem",
      fontSize: "24px",
      fontWeight: "bold",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    bettingControls: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      alignItems: "center",
    },
    betButtons: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1rem",
    },
    betAmounts: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      gap: "0.5rem",
      width: "100%",
      maxWidth: "400px",
    },
    button: {
      backgroundColor: "#004D4D",
      color: "#FFFFFF",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      fontSize: "1rem",
      fontWeight: "500",
      "&:disabled": {
        backgroundColor: "#9CA3AF",
        cursor: "not-allowed",
      },
    },
    message: {
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: "rgba(0, 77, 77, 0.1)",
      color: "#004D4D",
      marginTop: "1rem",
      textAlign: "center",
    },
  };
export default Craps;