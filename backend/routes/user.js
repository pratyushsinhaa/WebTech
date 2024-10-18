const {Router} = require("express");
const {User, Account} = require("../db");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const {username, password, firstName, lastName} = req.body;

    if (await User.find({username: username})) {
        res.status(400).json({
            message: "The user already exists!"
        })
    }

    try {
        const user = await User.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        })

        await Account.create({
            userID: userID,
            amount: 1 + Math.random() * 1000
        })

        res.status(200).json({
            message: "User created successfully!"
        })

    } catch (err) {
        res.status(500).json({
            message: "An error signing up",
            error: err.message
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!User.find({username: username})) {
        res.status(400).json({
            message: "The user does not exist"
        })
    }

    try {
        if (await User.find({username, password})) {
            res.status(200).json({
                message: "Signed in successfully!"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error signing in",
            error: err.message
        })
    }
})
