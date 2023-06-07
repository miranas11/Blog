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

module.exports.showComments = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("comments");
    console.log(post);
    const comments = post.comments;
    res.send(comments);
};
module.exports.showComment = async (req, res) => {
    const { commentId } = req.params;
    console.log(commentId);
    const comment = await Comment.findById(commentId);
    console.log(comment);
    res.send(comment);
};

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    const message = `Comment with ${id} ID Succesfully deleted`;
    res.redirect(`/posts/${id}?message=${encodeURIComponent(message)}`);
};
