const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");
const { catchAsync } = require("../utils/middlewares");

router.route("/register").post(userController.createUser);

router
    .route("/login")
    .get((req, res) => {
        console.log("hksad");
        req.session.user_id = "hello";
        res.send(req.session);
    })
    .post(userController.validateUser);

router.route("/:id").get(catchAsync(userController.showUserById));

module.exports = router;
