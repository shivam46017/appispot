const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors({origin: '*'}));
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
const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
//app.use(cors({origin: '*'}));
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
