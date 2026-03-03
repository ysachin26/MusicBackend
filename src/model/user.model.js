const {
    Schema,
    model,
    default: mongoose
} = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
        },
        role:
        {
            type: String,
            enum: ['user', 'artist'],
            default: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

const userModel = mongoose.model("user", userSchema)
module.exports = userModel