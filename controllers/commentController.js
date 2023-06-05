const Comment = require("../models/comment");
const Post = require("../models/post");

const { user_id } = require("../constants");

module.exports.createComment = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body);
    comment.author = user_id;
    post.comments.push(comment);
    await post.save();
    await comment.save();
    res.send(comment);
};
