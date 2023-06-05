const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    date: {
        type: String,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
