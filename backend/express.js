const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { userValidationSignUp, userValidationLogin } = require("./auth");
const { User, Account } = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// User sign up route
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

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
