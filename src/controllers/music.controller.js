const musicModel = require('../model/music.model');
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')
async function createMusic(req, res) {

    //check user is logged in or not
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = (req.cookies && req.cookies.token) || req.body?.token || bearerToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" })
    }

    let decoded;
    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "Unauthorized Access" })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized access" })
    }


    const { title } = req.body || {};
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ message: "File is required" })
    }

    const result = await uploadFile(file.buffer.toString('base64'))
    const music = await musicModel.create(
        {
            uri: result.url,
            title,
            artist: decoded.id,
        }
    )

    res.status(201).json(
        {
            message: "music created successfully",
            music:
            {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            }
        }
    )



}

module.exports = { createMusic }