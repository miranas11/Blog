const express = require("express");
const commentController = require("../controllers/commentController");
const {
    validateComments,
    requireLogin,
    isCommentAuthor,
    catchAsync,
    checkId,
} = require("../utils/middlewares");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(commentController.showComments)
    .post(requireLogin, validateComments, commentController.createComment);

router
    .route("/:commentId")
    .get(checkId, catchAsync(commentController.showComment))
    //need to implement isauthor
    .delete(
        checkId,
        isCommentAuthor,
        catchAsync(commentController.deleteComment)
    );
module.exports = router;
