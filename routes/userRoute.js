const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");

router.route("/").post(userController.createUser);

router.route("/:id").get(userController.showUserById);

module.exports = router;
