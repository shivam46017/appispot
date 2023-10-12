const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const userSchema = require("./schema/userSchema");
const SellerSchema = require("./schema/sellerSchema");
const orderSchema = require("./schema/orderSchema");
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const admin = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");

const seller = require("./routes/sellerRoutes");
const user = require("./routes/userRoutes");

const banner = require("./routes/bannerRoutes");

const chat = require("./routes/chatRoutes");
const order = require("./routes/orderRoutes");
const reviewSchema = require("./schema/reviewSchema");
// const couponsSchema = require("./schema/couponsSchema");
const discountCoupon = require("./routes/discountCouponRoute");
const { paymentConfirm } = require("./controller/orderController");
const sellerSchema = require("./schema/sellerSchema");
const {
  initializeUserForChat,
  handleMessageSendedByUsers,
} = require("./controller/chatController");
const Chat = require("./schema/chatSchema");
const auth = require('./middlewares/auth')

// const dotenv = require("dotenv");

// dotenv.config();

app.use(cookieParser());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("connection", async ({ id, role }) => {
    console.log(id, " ", role, " ", socket.id, "dhinchak pooja");
    if (role === "user") {
      await userSchema.findByIdAndUpdate(id, { chatId: socket.id });
    }

    if (role === "seller") {
      await sellerSchema.findByIdAndUpdate(id, { chatId: socket.id });
    }
  });

  socket.on("send-message", async ({ myId, toRole, toId, spot, message }) => {
    if (toRole === "user") {
      const user = await userSchema.findById(toId);
      if (user.queries.length === 0) {
        let chat = await Chat.create({
          inquirer: user?._id,
          respondent: myId,
          spot,
        });
        let seller = await sellerSchema.findById(myId);
        chat.messages.push({ message, by: seller.firstName + " " + seller.lastName });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        user.queries.push(chat._id);
        await user.save();
        if (user.chatId !== "") socket.broadcast.to(user?.chatId).emit({ message, by: seller.firstName + " " + seller.lastName });
      } else {
        user.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent._id === myId &&
            chat.inquirer.id === toId &&
            chat.spot._id === spot
          ) {
            chat.messages.push({
              message,
            });
            await chat.save();
            if (user.chatId !== "")
              socket.broadcast.to(user.chatId).emit({ message, by: user.firstName + " " + user.lastName });
            return;
          }
        });
      }
    }

    if (toRole === "seller") {
      const seller = await sellerSchema.findById(toId);
      if (seller.queries.length === 0) {
        let chat = await Chat.create({
          respondent: toId,
          inquirer: myId,
          spot,
        });
        chat.messages.push({
          message,
        });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        let user = await userSchema.findById(myId);
        user.queries.push(chat._id);
        await user.save();
        if (seller.chatId !== "")
          socket.broadcast.to(seller.chatId).emit(message);
      } else {
        seller.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent === myId &&
            chat.inquirer === toId &&
            chat.spot === spot
          ) {
            chat.messages.push({
              message,
            });
            await chat.save();
            if (seller.chatId !== "")
              socket.broadcast.to(seller.chatId).emit(message);
            return;
          }
        });
      }
    }
  });
});

app.post(
  "/api/payment-webhook",
  bodyParser.raw({ type: "*/*" }),
  paymentConfirm
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js

app.use(express.static(path.join(__dirname, "build")));
// use API routes
app.use("/api/admin", admin);
app.use("/api", user);
app.use("/api", discountCoupon);

app.use("/api", auth, chat);
app.use("/api", auth, seller);
app.use("/api", banner);
app.use("/api", order);
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));
app.use("/docs", express.static("docs"));

mongoose.set("strictQuery", false);
const url =
  "mongodb+srv://ashwin:L73LFmAD66yVJkdB@cluster0.bmzbyjh.mongodb.net/Appispot?retryWrites=true&w=majority";
// const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority"

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

server.listen(5000, () => {
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
