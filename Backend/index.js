const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const userSchema = require("./schema/userSchema");
const sellerSchema = require("./schema/sellerSchema");
const orderSchema = require("./schema/orderSchema");
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const admin = require("./routes/adminRoutes");

const seller = require("./routes/sellerRoutes");
const user = require("./routes/userRoutes");

const banner = require("./routes/bannerRoutes");

const chat = require("./routes/chatRoutes");
const order = require("./routes/orderRoutes");
const reviewSchema = require("./schema/reviewSchema");
// const couponsSchema = require("./schema/couponsSchema");
const discountCoupon = require("./routes/discountCouponRoute");
const { paymentConfirm } = require("./controller/orderController");
// const dotenv = require("dotenv");

// dotenv.config();
app.use(cors({
  origin: "http://localhost:5173"
}));

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });



app.post('/api/payment-webhook', bodyParser.raw({type: '*/*'}), paymentConfirm)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js

app.use(express.static(path.join(__dirname, "build")));
// use API routes
app.use("/api", admin);
app.use("/api", user);
app.use("/api", discountCoupon);

app.use("/api", chat);
app.use("/api", seller);
app.use("/api", banner);
app.use("/api", order);
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));

mongoose.set("strictQuery", false);
const url =
  "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});
app.post("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((e) => {
    console.log(e);
  });

async function addReview() {
  try {
    const review = "";
    await reviewSchema.create({
      spotId: "64494b75e51ac7214d160a13",
      // clientName: "Koustav Kanak",
      client: "641c5254c9adbd0700c986bc",
      rating: 4,
      review:
        "I recently rented this marriage hall for my daughter's wedding and I have to say, I was thoroughly impressed with the venue. The hall itself was spacious and beautifully decorated, with ample seating for all of our guests. ",
    });
  } catch (error) {
    console.log(error);
  }
}

// addReview()