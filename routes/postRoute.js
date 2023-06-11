const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const {
    validatePosts,
    requireLogin,
    isAuthor,
    catchAsync,
    checkId,
} = require("../utils/middlewares");

router
    .route("/")
    .get(catchAsync(postController.showAllPosts))
    .post(requireLogin, validatePosts, catchAsync(postController.createPost));

router
    .route("/:id")
    .get(checkId, catchAsync(postController.showPost))
    //need to implemet is author for deletepost
    .delete(checkId, catchAsync(isAuthor), postController.deletePost);

module.exports = router;
