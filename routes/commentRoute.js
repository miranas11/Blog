const express = require("express");
const commentController = require("../controllers/commentController");
const { validateComments, requireLogin } = require("../utils/middlewares");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(commentController.showComments)
    .post(requireLogin, validateComments, commentController.createComment);

router
    .route("/:commentId")
    .get(commentController.showComment)
    //need to implement isauthor
    .delete(commentController.deleteComment);
module.exports = router;
