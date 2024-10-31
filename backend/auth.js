const zod = require("zod");
const { User, Account } = require("./db");

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
    return res.status(400).json({
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
    return res.status(400).json({
      message: "Incorrect Inputs",
      error: err.message,
    });
  }
};

module.exports = {
  userValidationSignUp,
  userValidationLogin,
};
