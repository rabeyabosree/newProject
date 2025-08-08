const mongoose = require('mongoose')


const progresSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'] },
    submittedAt: Date,
    solutionLink: String
}, { _id: false })


const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    preferredLanguage: { type: [String], enum: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'], required: true },
    skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    estimatedTime: { type: String, required: true },
    dayNumber: { type: Number, required: true, unique: true },
    progress: { type: [progresSchema], default: [] },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const Challeng = mongoose.model("Challeng", challengeSchema)
module.exports = Challeng