const Post = require("../models/post");
const { user_id } = require("../constants");

module.exports.showAllPosts = async (req, res) => {
    const posts = await Post.find().populate("author").populate("comments");
    res.send(posts);
};

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    post.author = user_id;
    await post.save();
    res.send(post);
};

module.exports.showPost = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
        .populate({ path: "author", select: "username" })
        .populate({
            path: "comments",
            select: "body author",
            populate: { path: "author", select: "username" },
        });
    res.send(post);
};
