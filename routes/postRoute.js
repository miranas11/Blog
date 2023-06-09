const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const { validatePosts, requireLogin } = require("../utils/middlewares");

router
    .route("/")
    .get(postController.showAllPosts)
    .post(requireLogin, validatePosts, postController.createPost);

router
    .route("/:id")
    .get(postController.showPost)
    //need to implemet is author for deletepost
    .delete(postController.deletePost);

module.exports = router;
