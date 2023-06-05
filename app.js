const express = require("express");
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");

const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});

app.use(bodyParser.json());

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
