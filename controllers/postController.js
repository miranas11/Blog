const Post = require("../models/post");
const { user_id } = require("../constants");
const User = require("../models/user");

module.exports.showAllPosts = async (req, res) => {
    const message = req.query.message;
    const posts = await Post.find()
        .populate({ path: "author", select: "username" })
        .populate({
            path: "comments",
            select: "body autor",
            populate: { path: "author", select: "username" },
        });
    res.send({ message, posts });
};

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    //sets the post autor to current loged in user
    post.author = req.session.user_id;
    const user = await User.findById(req.session.user_id);

    savedPost = await post.save();
    user.posts.push(savedPost._id);
    await user.save();
    res.send(post);
};

module.exports.showPost = async (req, res) => {
    const id = req.params.id;
    const message = req.query.message;

    const post = await Post.findById(id)
        .populate({ path: "author", select: "username" })
        .populate({
            path: "comments",
            select: "body author",
            populate: { path: "author", select: "username" },
        });
    res.send({ message, post });
};

module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const message = `Post with Id ${id} ID deleted succesfully`;
    res.redirect(`/posts?message=${encodeURIComponent(message)}`);
};
