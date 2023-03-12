const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const admin = require("./routes/adminRoutes");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.set("strictQuery", false);
const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/test";


app.use("/api", admin);
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
