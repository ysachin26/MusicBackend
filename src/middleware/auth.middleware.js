const jwt = require('jsonwebtoken')

function authArtist(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "you don't have access to create a album" })
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error })
    }

}

function authUser(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "you don't have access to fetch musics" })
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error })
    }

}
module.exports = { authArtist, authUser }