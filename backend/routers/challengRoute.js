const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const Challeng = require('../model/challengeModel');

const router = express.Router();

// Generate challenges
router.get("/challenge", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        const { skillLevel, preferredLanguage } = req.query
        console.log(skillLevel, preferredLanguage)
       
        if (!skillLevel || !preferredLanguage) {
            return res.status(400).json({ message: "Skill level and preferred language are required" });
        }

        // Format date to YYYY-MM-DD
        const dayNumber = 1

        const challenge = await Challeng.findOne({
            skillLevel,
            preferredLanguage,
            dayNumber
        });



        if (!challenge) {
            return res.status(404).json({ message: "No challenge available at this time" });
        }

        res.status(200).json({
            message: "Challenge generated successfully",
            challenge: challenge
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Challenge generating error" });
    }
});

module.exports = router;
