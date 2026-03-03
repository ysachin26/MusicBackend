const { Schema, model, default: mongoose, mongo } = require('mongoose')

const albumSchema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        musics:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true
                }
            ],
        artist:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    }
)

const albumModel = mongoose.model("album", albumSchema)
module.exports = albumModel