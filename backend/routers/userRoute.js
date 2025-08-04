const express = require("express")
const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require('../middleware/verifyToken')
const upload = require('../utility/storage')

const router = express.Router()

// user register route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, skillLevel, preferredLanguage } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        const hassedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name: name,
            email: email,
            password: hassedPassword,
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
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        const userInfo = {
            id: user._id,
            name: user.name,
            email: email,
            skillLevel: user.skillLevel,
            preferredLanguage: user.preferredLanguage,
            profileImg: user.profileImg,
            bio: user.bio

        }
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

        res.status(200).json({ user: user, message: "user profle fetchied" })

    } catch (error) {
        console.error("register error:", error)
        res.status(500).json({ message: "Internal sever error" })

    }
})

// user profile update route
router.put("/update-profile", verifyToken, upload.single('profileImg'), async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "user not found" })
        }

        const { skillLevel, preferredLanguage, bio } = req.body
        const profileImg = req.file.path

        const updateData = {
            ...(bio && { bio }),
            ...(preferredLanguage && {
                preferredLanguage: Array.isArray(preferredLanguage) ? preferredLanguage : [preferredLanguage]
            }),
            ...(skillLevel && {
                skillLevel: Array.isArray(skillLevel) ? skillLevel : [skillLevel]
            }),
            ...(profileImg && { profileImg })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { $new: true }
        )

        res.status(200).json({ message: 'user updated', user: updatedUser })

    } catch (error) {
        console.error("register error:", error)
        res.status(500).json({ message: "Internal sever error" })

    }
})

module.exports = router