import React, { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      const token = localStorage.getItem("authToken"); // Correct key used here

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/wallet", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          },
        });

        setBalance(response.data.balance);
      } catch (error) {
        setError("Failed to fetch wallet data");
      }
    };

    fetchWalletData();
  }, []);

  return (
    <></>
  );
};

export default Wallet;