const musicModel = require('../model/music.model');
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')
const albumModel = require('../model/album.model')

async function createMusic(req, res) {

    try {
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
                artist: req.user.id,
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

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error })
    }



}

async function createAlbum(req, res) {


    try {


        const { title, musicId } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            music: musicId
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,

            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error })
    }

}

async function getAllMusic(req, res) {
    const musics = await musicModel.find()

    res.status(200).json({
        message: "music fectched successfully",
        musics: musics,
    })
}

async function getAllAlbum(req, res) {
    const album = await albumModel.find().select("title artist")

    res.status(200).json({
        message: "album fectched successfully",
        musics: album,
    })
}
async function getAlbumById(req, res) {

    const albumId = req.params.id;
    const album = await albumModel.findById(albumId)

    res.status(200).json({
        message: "album fectched successfully",
        album: album,
    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum, getAlbumById }