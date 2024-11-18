import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDepositAlert, setShowDepositAlert] = useState(false);
  const navigate = useNavigate();

  const fetchWalletData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found, please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setBalance(data.balance || 0);
      setTransactions(data.transactions || []);
      if (data.balance === 0) setShowDepositAlert(true);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError("Failed to fetch wallet data.");
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setError("Please log in to make a deposit.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/wallet/deposit",
        { username, amount: 1000 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;
      setBalance(data.balance || 0);
      setShowDepositAlert(false);
      fetchWalletData(); // Refresh wallet data
    } catch (err) {
      console.error("Error making deposit:", err);
      setError("Failed to make deposit.");
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
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {error && <div style={styles.errorAlert}>{error}</div>}

      {showDepositAlert && (
        <div style={styles.depositAlert}>
          <p>Your balance is low. Consider adding more funds.</p>
        </div>
      )}

      <div style={styles.walletCard}>
        <h2 style={styles.balanceLabel}>Available Balance</h2>
        <div style={styles.balanceAmount}>₹{balance.toFixed(2)}</div>
        <button style={styles.depositButton} onClick={handleDeposit}>
          Add ₹1000
        </button>
      </div>

      <div style={styles.transactionsCard}>
        <h3 style={styles.sectionTitle}>Recent Transactions</h3>
        <div style={styles.transactionList}>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <div key={index} style={styles.transaction}>
                <div style={styles.transactionInfo}>
                  <span style={styles.transactionType}>{tx.type}</span>
                  <span style={styles.transactionDate}>
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
                <span
                  style={{
                    ...styles.transactionAmount,
                    color: tx.amount > 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {tx.amount > 0 ? "+" : ""}
                  ₹{tx.amount.toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <div style={styles.noTransactions}>No transactions yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", padding: "2rem", background: "#f3f4f6" },
  backButton: {
    marginBottom: "1rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#374151",
  },
  errorAlert: { color: "#dc2626", marginBottom: "1rem" },
  depositAlert: { background: "#fef3c7", padding: "1rem", marginBottom: "1rem" },
  walletCard: {
    padding: "2rem",
    background: "white",
    borderRadius: "0.5rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  balanceLabel: { fontSize: "1.25rem", color: "#374151" },
  balanceAmount: { fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" },
  depositButton: {
    background: "#2563eb",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
  transactionsCard: { padding: "1rem", background: "white", borderRadius: "0.5rem" },
  sectionTitle: { fontSize: "1.25rem", color: "#374151", marginBottom: "1rem" },
  transactionList: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  transaction: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem",
    background: "#f9fafb",
    borderRadius: "0.5rem",
  },
  transactionInfo: { display: "flex", flexDirection: "column" },
  transactionType: { fontWeight: "bold", color: "#374151" },
  transactionDate: { color: "#6b7280" },
  transactionAmount: { fontWeight: "bold" },
  noTransactions: { textAlign: "center", color: "#6b7280" },
};

export default WalletPage;