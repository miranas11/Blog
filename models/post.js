const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment");

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

postSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments,
            },
        });
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
