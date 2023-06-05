const express = require("express");
const commentController = require("../controllers/commentController");
const { validateComments } = require("../utils/middlewares");
const router = express.Router({ mergeParams: true });

router.post("/", validateComments, commentController.createComment);

module.exports = router;
