const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User, Account } = require("./db");
const { userValidationSignUp, userValidationLogin } = require("./auth");

const app = express();
const port = 3000;
const JWT_SECRET = "your_jwt_secret";

app.use(cors());
app.use(bodyParser.json());

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

app.post("/login", userValidationLogin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Logged In",
        token,
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

app.get("/wallet", authenticateToken, async (req, res) => {
  const { userId } = req.user;

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
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const account = await Account.findOne({ userId: user._id });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (!account.transactions) {
      account.transactions = [];
    }

    account.amount += Number(amount);

    account.transactions.push({ type: "Deposit", amount, date: new Date() });

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
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const account = await Account.findOne({ userId: user._id });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (!account.transactions) {
      account.transactions = [];
    }

    if (account.amount < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.amount -= amount;

    account.transactions.push({ type: "Withdrawal", amount, date: new Date() });

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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/wallet/update", authenticateToken, async (req, res) => {
  const { balance, gameResult, betAmount } = req.body;
  const { userId } = req.user;

  if (balance === undefined || balance < 0) {
    return res.status(400).json({ message: "Invalid balance amount" });
  }

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update account balance
    account.amount = balance;

    // Handle transaction history
    let transactionType;
    let transactionAmount = Math.abs(balance - account.amount);

    switch (gameResult) {
      case "blackjack":
        transactionType = "Blackjack Win (Blackjack)";
        break;
      case "dealer_bust":
      case "player_wins":
        transactionType = "Blackjack Win";
        break;
      case "push":
        transactionType = "Blackjack Push";
        break;
      case "bust":
      case "dealer_wins":
        transactionType = "Blackjack Loss";
        break;
      default:
        transactionType = "Game Transaction";
    }

    if (!account.transactions) {
      account.transactions = [];
    }

    account.transactions.push({
      type: transactionType,
      amount: betAmount,
      date: new Date(),
    });

    await account.save();

    res.status(200).json({
      message: "Balance updated successfully",
      balance: account.amount,
      transaction: account.transactions[account.transactions.length - 1],
    });
  } catch (err) {
    console.error("Wallet update error:", err);
    res.status(500).json({
      message: "Error updating balance",
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
