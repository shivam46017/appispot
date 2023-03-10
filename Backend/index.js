const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.set("strictQuery", false);
const url = "";


app.all("/", (req, res) => {
  // res.send("Hello Darling")
  res.send("Hello Darling");
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((e) => {
    console.log(e);
  });
