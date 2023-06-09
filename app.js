const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");

// const bodyParser = require("body-parser");

const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

// app.use(bodyParser.json());
app.use(express.json());

app.use(
    session({
        secret: "x7c59#S2g^r$H9npRDf@!L$B2jkQp8",
        resave: false,
        saveUninitialized: true,
    })
);

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});

mongoose
    .connect("mongodb://127.0.0.1:27017/Blog")
    .then(() => {
        console.log("Connection Open");
    })
    .catch((e) => {
        console.log("ERROR");
    });

app.get("/", (req, res) => {
    res.send("WELCOME TO THE BLOGGING WEBSITE");
});

app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/posts/:id/comments", commentRoute);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "ERROR NOT FOUND" } = err;
    console.log("**************ERROR*******************");
    res.status(statusCode).send(message);
});
