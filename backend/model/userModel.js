const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skillLevel: { type: ['Beginner', 'Intermediate', 'Advanced'], default: ['Beginner'] },
    preferredLanguage: { type: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'], default: ['JavaScript'] },
    createdAt: { type: Date, default: Date.now },
    profileImg: { type: String },
    bio: { type: String }
})


const User = mongoose.model("User", userSchema)
module.exports = User