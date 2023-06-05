const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");

router.route("/").get().post(userController.createUser);

module.exports = router;
