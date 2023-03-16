const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js
const admin = require("./routes/adminRoutes");

const user = require("./routes/userRoutes");
// use API routes
app.use("/api", admin);
app.use("/api", user);

// use API routes
// router(app);

// >> StrictQuery
mongoose.set("strictQuery", false);
// const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/";
// "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";


app.all("/", (req, res) => {
  // res.send("Hello Darling");
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.send("Hello Darling");
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    // const client = new MongoClient(url, { useNewUrlParser: true });
    // client.connect((err) => {
    //   const collection = client.db("participants").collection("boxers");
    //   console.log("collection", collection);
    //   // perform actions on the collection object
    //   client.close();
    // });
    console.log("connection succesful");
  })
  .catch((e) => {
    console.log(e);
  });
