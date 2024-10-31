const zod = require("zod");
const { User } = require("./db");

const userValidationSignUp = (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    zod
      .object({
        username: zod.string().email(),
        password: zod.string().min(6),
        firstName: zod.string(),
        lastName: zod.string(),
      })
      .parse({ username, password, firstName, lastName });
    next();
  } catch (err) {
    res.status(400).json({
      message: "Incorrect Inputs",
      error: err.message,
    });
  }
};

const userValidationLogin = (req, res, next) => {
  const { username, password } = req.body;

  try {
    zod
      .object({
        username: zod.string().email(),
        password: zod.string().min(6),
      })
      .parse({ username, password });
    next();
  } catch (err) {
    res.status(400).json({
      message: "Incorrect Inputs",
      error: err.message,
    });
  }
};

const signup = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        message: "This Email is already used",
      });
    }

    const newUser = new User({ username, password, firstName, lastName });
    await newUser.save();

    res.status(201).json({
      message: "User successfully registered",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error signing up",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username, password });

    if (userExists) {
      return res.status(200).json({
        message: "Welcome",
      });
    } else {
      res.status(400).json({
        message: "The user does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = {
  userValidationSignUp,
  userValidationLogin,
  signup,
  login,
};
