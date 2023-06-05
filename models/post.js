const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: String,
    likes: number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [String],
    date: {
        type: String,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
