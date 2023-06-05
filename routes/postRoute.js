const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router
    .route("/")
    .get(postController.showAllPosts)
    .post(postController.createPost);

router.route("/:id").get(postController.showPost);

module.exports = router;
