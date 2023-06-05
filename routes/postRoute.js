const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const { validatePosts } = require("../utils/middlewares");

router
    .route("/")
    .get(postController.showAllPosts)
    .post(validatePosts, postController.createPost);

router.route("/:id").get(postController.showPost);

module.exports = router;
