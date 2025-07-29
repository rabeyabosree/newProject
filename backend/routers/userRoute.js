const express = require("express")
const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

// user register route
router.post("register", async (req, res) => {
    try {
        const { name, email, password, skillLevel, preferredLanguage } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password,
            skillLevel: skillLevel,
            preferredLanguage: preferredLanguage
        })

        await newUser.save()

        res.status(201).json({ message: "user created successfuly", user: newUser })


    } catch (error) {
        console.error("register error:", error)
        res.status(500).json({ message: "Internal sever error" })

    }
})


// user login route
router.post("login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const hassedPassword = await bcrypt.hash(password, 10)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        const userInfo = new User({
            email: email,
            password: hassedPassword,

        })

        await userInfo.save()

        res.status(200).json({ message: "user created successfuly", user: userInfo, token: token })


    } catch (error) {
        console.error("register error:", error)
        res.status(500).json({ message: "Internal sever error" })

    }
})

// user profile route
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User Id no found" })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ user })

    } catch (error) {

    }
})

module.exports = router