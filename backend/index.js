const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }

))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MONGO_URL = process.env.MONGO_URI

mongoose.connect(MONGO_URL)
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log("mongo error", err))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})

// routes
const userRoute = require('./routers/userRoute')
const challengRoute = require('./routers/challengRoute')

app.use("/api/user", userRoute)
app.use("/api/challengs", challengRoute)

app.get('/', (req, res) => {
    res.send("Hello from the backend")
})