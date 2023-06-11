const { postSchema, commentSchema } = require("./schemas.js");
const CustomError = require("./CustomError.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const mongoose = require("mongoose");
const {
    Types: { ObjectId },
} = mongoose;
module.exports.validatePosts = (req, res, next) => {
    const result = postSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.message;
        throw new CustomError(msg, 404);
    } else {
        next();
    }
};

module.exports.validateComments = (req, res, next) => {
    const result = postSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.message;
        throw new CustomError(msg, 404);
    } else {
        next();
    }
};

//cheks user if logged in
module.exports.requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.send("PLEASE LOGIN FIRST");
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    console.log(post);
    if (!post) {
        throw new CustomError("POST NOT FOUND", 400);
    }

    if (!post.author.equals(req.session.user_id)) {
        throw new CustomError(
            "YOU DONT HAVE PERMISSION TO DELETE THIS AS YOU ARE NOT THE AUTHOR",
            400
        );
    }
    next();
};

module.exports.isCommentAuthor = async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.session.user_id))
        return res.send("YOU DON'T HAVE PERMISSION TO DO THIS");

    next();
};

module.exports.catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

const validateObjectId = (id) =>
    ObjectId.isValid(id) && new ObjectId(id).toString() === id;

module.exports.checkId = (req, res, next) => {
    const { commentId, id } = req.params;

    if (!validateObjectId(id)) {
        throw new CustomError("OBJECT ID NOT VALID", 400);
    }
    if (commentId && !validateObjectId(commentId)) {
        throw new CustomError("COMMENT ID NOT VALID", 400);
    }
    next();
};
