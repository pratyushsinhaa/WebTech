import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(1000);
  const [transactions] = React.useState([]);

  const handleDeposit = () => {
    setBalance(prevBalance => prevBalance + 1000);
  };

  const handleWithdraw = () => {
    setBalance(prevBalance => prevBalance - 1000);
  };

  return (
    <div style={styles.container}>
      <motion.div 
        style={styles.content}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← Back
        </motion.button>

        <motion.div 
          style={styles.walletCard}
          whileHover={{ y: -5 }}
        >
          <div style={styles.balanceSection}>
            <h2 style={styles.balanceLabel}>Available Balance</h2>
            <motion.div 
              style={styles.balanceAmount}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              ₹{balance.toFixed(2)}
            </motion.div>
          </div>

          <div style={styles.buttonGroup}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.actionButton}
              onClick={handleDeposit}
            >
              Deposit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{...styles.actionButton, backgroundColor: "#dc2626"}}
              onClick={handleWithdraw}
            >
              Withdraw
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          style={styles.transactionsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={styles.sectionTitle}>Recent Transactions</h3>
          <div style={styles.transactionList}>
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                style={styles.transaction}
                whileHover={{ backgroundColor: "#f8fafc" }}
              >
                <div style={styles.transactionInfo}>
                  <span style={styles.transactionType}>{tx.type}</span>
                  <span style={styles.transactionDate}>{tx.date}</span>
                </div>
                <span style={{
                  ...styles.transactionAmount,
                  color: tx.amount > 0 ? "#16a34a" : "#dc2626"
                }}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
    padding: "6rem 1rem 2rem 1rem",
  },
  content: {
    maxWidth: "1152px",
    margin: "0 auto",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#475569",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  walletCard: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "2rem",
    marginBottom: "2rem",
  },
  balanceSection: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  balanceLabel: {
    color: "#475569",
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
  },
  balanceAmount: {
    color: "#1e293b",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  },
  transactionsCard: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "2rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "1.5rem",
  },
  transactionList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  transaction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
  transactionInfo: {
    display: "flex",
    flexDirection: "column",
  },
  transactionType: {
    color: "#1e293b",
    fontWeight: "500",
  },
  transactionDate: {
    color: "#64748b",
    fontSize: "0.875rem",
  },
  transactionAmount: {
    fontWeight: "600",
  },
};

export default WalletPage;