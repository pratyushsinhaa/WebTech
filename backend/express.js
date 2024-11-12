const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { User, Account } = require("./db");
const { userValidationSignUp, userValidationLogin } = require("./auth");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({
        message: "Logged In",
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

app.get("/wallet", async (req, res) => {
  const userId = req.userId;
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
  const { userId, amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount should be greater than zero",
    });
  }

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    account.amount += amount;
    await account.save();

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
  const { userId, amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount should be greater than zero",
    });
  }

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.amount < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.amount -= amount;
    await account.save();

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

app.post("/game/bet", async (req, res) => {
  const { userId, betAmount } = req.body;
  if (betAmount <= 0) {
    return res.status(400).json({
      message: "Bet amount should be greater than zero",
    });
  }

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.amount < betAmount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.amount -= betAmount;
    await account.save();

    account.transactions.push({
      type: "Bet",
      amount: betAmount,
      date: new Date(),
    });
    await account.save();

    const win = Math.random() > 0.5;
    if (win) {
      const winnings = betAmount * 2;
      account.amount += winnings;
      await account.save();

      account.transactions.push({
        type: "Bet Win",
        amount: winnings,
        date: new Date(),
      });
    } else {
      account.transactions.push({
        type: "Bet Loss",
        amount: 0,
        date: new Date(),
      });
    }

    res.status(200).json({
      message: win ? "You win!" : "You lost!",
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
