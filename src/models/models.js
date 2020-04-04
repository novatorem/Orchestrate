const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "owner": {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    "songs": {
        type: [String], // spotify ids
    }
})

const PostSchema = new mongoose.Schema({
    "ownerID": {
        type: String,
        required: true
    },
    "text": {
        type: String,
        required: false
    },
    "ownerName": {
        type: String,
        required: true
    },
    "isBanned": {
        type: Boolean,
        default: false
    },
    "numReports": {
        type: Number,
        default: 0
    }
})

module.exports = {
    "Playlist": mongoose.model("Playlist", PlaylistSchema),
    "Post": mongoose.model("Post", PostSchema)
};
