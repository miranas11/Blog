const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const {
    validatePosts,
    requireLogin,
    isAuthor,
    catchAsync,
} = require("../utils/middlewares");

router
    .route("/")
    .get(postController.showAllPosts)
    .post(requireLogin, validatePosts, postController.createPost);

router
    .route("/:id")
    .get(catchAsync(postController.showPost))
    //need to implemet is author for deletepost
    .delete(isAuthor, catchAsync(postController.deletePost));

module.exports = router;
