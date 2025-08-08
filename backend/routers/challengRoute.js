const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const Challeng = require('../model/challengeModel');
const User = require("../model/userModel")

const router = express.Router();

// Generate challenges
router.get("/challenge", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        const { skillLevel, preferredLanguage } = req.query;
        if (!skillLevel || !preferredLanguage) {
            return res.status(400).json({ message: "Skill level and preferred language are required" });
        }

        console.log(req.query.skillLevel)
        console.log(req.query.preferredLanguage)

        // Step 1: Get user with firstChallengeDate
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Step 2: If user is logging in for the first time, set firstChallengeDate
        if (!user.firstChallengeDate) {
            user.firstChallengeDate = new Date(); // save current date
            await user.save();
        }

        // Step 3: Calculate the number of days passed since firstChallengeDate
        const currentDate = new Date();
        const startDate = new Date(user.firstChallengeDate);

        // Only compare dates, not time
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = currentDate.setHours(0, 0, 0, 0) - startDate.setHours(0, 0, 0, 0);
        const dayNumber = Math.floor(diffInTime / oneDay) + 1;

        // Step 4: Find challenge for this day
        const challenge = await Challeng.findOne({
            skillLevel,
            preferredLanguage,
            dayNumber
        });

        if (!challenge) {
            return res.status(404).json({ message: "No challenge available for day " + dayNumber });
        }

        res.status(200).json({
            message: "Challenge generated successfully",
            challenge : challenge,
            dayNumber,
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Challenge generating error" });
    }
});


module.exports = router;
