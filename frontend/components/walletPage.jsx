import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDepositAlert, setShowDepositAlert] = useState(false);

  const fetchWalletData = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setError("Please log in to make a deposit");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallet data');
      }

      const data = await response.json();
      setBalance(data.balance);
      if (data.balance === 0) {
        setShowDepositAlert(true);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch wallet data");
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setError("Please log in to make a deposit");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/wallet/deposit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          amount: 1000
        })
      });

      if (!response.ok) {
        throw new Error('Failed to make deposit');
      }

      const data = await response.json();
      setBalance(data.balance);
      setShowDepositAlert(false);
      await fetchWalletData(); // Refresh wallet data after deposit
    } catch (err) {
      setError("Failed to make deposit");
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {error && (
          <div style={styles.errorAlert}>
            <p>{error}</p>
          </div>
        )}

        {showDepositAlert && (
          <div style={styles.depositAlert}>
            <p>Your balance is low. Consider adding more funds to continue playing.</p>
          </div>
        )}

        <div style={styles.walletCard}>
          <div style={styles.balanceSection}>
            <h2 style={styles.balanceLabel}>Available Balance</h2>
            <div style={styles.balanceAmount}>
              ₹{balance.toFixed(2)}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={styles.depositButton}
              onClick={handleDeposit}
            >
              Add ₹1000
            </button>
          </div>
        </div>

        <div style={styles.transactionsCard}>
          <h3 style={styles.sectionTitle}>Recent Transactions</h3>
          <div style={styles.transactionList}>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <div
                  key={index}
                  style={styles.transaction}
                >
                  <div style={styles.transactionInfo}>
                    <span style={styles.transactionType}>{tx.type}</span>
                    <span style={styles.transactionDate}>
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span style={{
                    ...styles.transactionAmount,
                    color: tx.amount > 0 ? "#16a34a" : "#dc2626"
                  }}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div style={styles.noTransactions}>
                No transactions yet
              </div>
            )}
          </div>
        </div>
      </div>
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontSize: "1.125rem",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#475569",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  errorAlert: {
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem",
    color: "#dc2626",
  },
  depositAlert: {
    backgroundColor: "#fef9c3",
    border: "1px solid #fef08a",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem",
    color: "#854d0e",
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
    justifyContent: "center",
  },
  depositButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s",
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
    backgroundColor: "white",
    transition: "background-color 0.2s",
    cursor: "default",
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
  noTransactions: {
    textAlign: "center",
    color: "#64748b",
    padding: "2rem 0",
  },
};

export default WalletPage;