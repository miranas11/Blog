const express = require("express");
const commentController = require("../controllers/commentController");
const { validateComments } = require("../utils/middlewares");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(commentController.showComments)
    .post(validateComments, commentController.createComment);

router
    .route("/:commentId")
    .get(commentController.showComment)
    .delete(commentController.deleteComment);
module.exports = router;
