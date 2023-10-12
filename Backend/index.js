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
const auth = require("./middlewares/auth");

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
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("connection", async ({ id, role }) => {
    console.log(id, " ", role, " ", socket.id, "dhinchak pooja");
    if (role === "user") {
      const user = await userSchema.findByIdAndUpdate(id, { chatId: socket.id });
      socket.join('users')
      io.to('sellers').emit('online', { id: user._id.toString(), online: true })
    }

    if (role === "seller") {
      const seller = await sellerSchema.findByIdAndUpdate(id, { chatId: socket.id });
      socket.join('sellers')
      io.to('users').emit('online', { id: seller._id.toString(), online: true })
    }
  });

  socket.on("send-message", async ({ myId, toRole, toId, spot, message }) => {
    try {
    if (toRole === "user") {
      const user = await userSchema.findById(toId);
      let seller = await sellerSchema.findById(myId);
      if (user.queries.length === 0) {
        let chat = await Chat.create({
          inquirer: user?._id,
          respondent: myId,
          spot,
        });
        chat.messages.push({
          message,
          by: seller.firstName + " " + seller.lastName,
          date: Date.now(),
        });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        user.queries.push(chat._id);
        await user.save();
        if (user.chatId !== "") {
          io.to(user.chatId).emit("receive-message", {
            message,
            by: seller.firstName + " " + seller.lastName,
          });
        }
      } else {
        user.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent._id.toString() === myId &&
            chat.inquirer._id.toString() === toId &&
            chat.spot._id.toString() === spot
          ) {
            chat.messages.push({
              by: seller.firstName + " " + seller.lastName,
              message,
              date: Date.now(),
            });
            await chat.save();
            if (user.chatId !== "") {
              io.to(user.chatId).emit("receive-message", {
                message,
                by: seller.firstName + " " + seller.lastName,
              });
              return;
            }
          }
        });
      }
    }

    if (toRole === "seller") {
      const seller = await sellerSchema.findById(toId);
      let user = await userSchema.findById(myId);
      if (seller._doc.queries.length === 0) {
        let chat = await Chat.create({
          respondent: toId,
          inquirer: myId,
          spot,
        });
        chat.messages.push({
          message,
          by: user.firstName + " " + user.lastName,
          date: Date.now(),
        });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        user.queries.push(chat._id);
        await user.save();
        if (seller.chatId !== "") {
          io.to(seller.chatId).emit("receive-message", {
            by: user.firstName + " " + user.lastName,
            message,
          });
        }
      } else {
        seller._doc.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent._id.toString() === toId &&
            chat.inquirer._id.toString() === myId &&
            chat.spot._id.toString() === spot
          ) {
            chat.messages.push({
              by: user.firstName + " " + user.lastName,
              message,
              date: Date.now(),
            });
            await chat.save();
            if (seller.chatId !== "") {
              io.to(seller.chatId).emit("receive-message", {
                by: user.firstName + " " + user.lastName,
                message,
              });
              return;
            }
          }
        });
      }
    }
  } catch (err) {
  }
  });

  socket.on("close-connection", async ({ id, role }) => {
    if (role === "user") {
      await userSchema.findByIdAndUpdate(id, { chatId: "" });
    }

    if (role === "seller") {
      await sellerSchema.findByIdAndUpdate(id, { chatId: "" });
    }
  });

  socket.on("online", async ({ toId, toRole, status }) => {
    if (toRole === "user") {
      const user = await userSchema.findById(toRole);
      if (user.chatId !== "") {
        io.to(user.chatId).emit('online', { id: seller._id, online: status })
      }
    }

    if (toRole === "seller") {
      const seller = await sellerSchema.findById(toId);
      if (seller.chatId !== "") {
        io.to(user.chatId).emit('online', { id: seller._id, online: status })
      }
    }
  });

  socket.on('typing', async ({ status, toId, toRole }) => {
    console.log(status, toId, toRole)
    if(toRole === 'seller') {
      let seller = await sellerSchema.findById(toId)
      if (seller.chatId !== '') {
      io.to(seller.chatId).emit('typing', status)
      }
    } else {
      let user = await userSchema.findById(toId)
      if (user.chatId !== '') {
        io.to(user.chatId).emit('typing', status)
      }
    }
  })
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

app.use("/api", chat);
app.use("/api", seller);
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
