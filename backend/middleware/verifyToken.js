const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['']
    if (!token) {
        return res.status(403).json({ message: "no token provided" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: "Unauthorized access" })
        }

        req.userId = decoded.userId;
        next()
    })
}

module.exports = verifyToken;