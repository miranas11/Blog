const express = require("express");
const mongoose = require("mongoose");
const app = express();

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
