const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User, Account } = require("./db");
const { userValidationSignUp, userValidationLogin } = require("./auth");

const app = express();
const port = 3000;
const JWT_SECRET = "your_jwt_secret"; // Use a more secure secret in production

app.use(cors());
app.use(bodyParser.json());

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Sign Up
app.post("/signup", userValidationSignUp, async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "This Email is already used" });
    }

    const newUser = new User({ username, password, firstName, lastName });
    await newUser.save();

    const newAccount = new Account({ userId: newUser._id, amount: 1000 });
    await newAccount.save();

    res.status(201).json({
      message: "SignUp Successful",
      amount: newAccount.amount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// Login
app.post("/login", userValidationLogin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Logged In",
        token, // Send token to the user
      });
    } else {
      res.status(400).json({
        message: "Wrong Credentials",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// Get Wallet Balance (Requires JWT Authentication)
app.get("/wallet", authenticateToken, async (req, res) => {
  const { userId } = req.user; // Extract userId from JWT

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.status(200).json({
      balance: account.amount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// Deposit to Wallet (Requires JWT Authentication)
app.post("/wallet/deposit", async (req, res) => {
  const { username, amount } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount should be greater than zero",
    });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find the account by userId
    const account = await Account.findOne({ userId: user._id });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    // Ensure the transactions array is initialized
    if (!account.transactions) {
      account.transactions = []; // Initialize transactions if it doesn't exist
    }

    // Add the deposit amount to the account balance
    account.amount += amount;

    // Add the deposit transaction
    account.transactions.push({ type: "Deposit", amount, date: new Date() });

    // Save the updated account
    await account.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: account.amount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// Withdraw from Wallet (Requires JWT Authentication)
app.post("/wallet/withdraw", async (req, res) => {
  const { username, amount } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount should be greater than zero",
    });
  }

  try {
    // Find the user by username first
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find the account using the userId from the found user
    const account = await Account.findOne({ userId: user._id });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    // Ensure the transactions array is initialized
    if (!account.transactions) {
      account.transactions = []; // Initialize the transactions array if it doesn't exist
    }

    // Check for sufficient balance
    if (account.amount < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Deduct the withdrawal amount from the account balance
    account.amount -= amount;

    // Add the withdrawal transaction
    account.transactions.push({ type: "Withdrawal", amount, date: new Date() });

    // Save the updated account
    await account.save();

    res.status(200).json({
      message: "Withdrawal successful",
      balance: account.amount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
