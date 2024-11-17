import React, { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(0); // Default to 0
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/wallet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance || 0); // Ensure balance is a number
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setError("Failed to fetch wallet data.");
      }
    };

    fetchWalletData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="wallet-container">
      <h2>Your Wallet</h2>
      <p>Balance: ₹{balance.toFixed(2)}</p>
    </div>
  );
};

export default Wallet;
