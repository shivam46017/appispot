const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
// const dotenv = require("dotenv");

// dotenv.config();

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

const seller = require("./routes/sellerRoutes");
const user = require("./routes/userRoutes");

const banner = require("./routes/bannerRoutes");

const chat = require("./routes/chatRoutes")
const order = require("./routes/orderRoutes");
const spotSchema = require("./schema/spotSchema");
const reviewSchema = require("./schema/reviewSchema");
// const couponsSchema = require("./schema/couponsSchema");
const discountCoupon = require("./routes/discountCouponRoute");
// use API routes
app.use("/api", admin);
app.use("/api", user);
app.use("/api", discountCoupon);

app.use("/api", chat);
app.use("/api", seller);
app.use("/api", banner)
app.use("/api", order)
app.use("/uploads", express.static('uploads'))
app.use("/invoices", express.static('invoices'))


// use API routes
// router(app);

// >> StrictQuery
mongoose.set("strictQuery", false);
const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
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

  const spot = new spotSchema({
    // coverImage: `/uploads/spotImages/${sellerId}/${coverImage.originalname}`,
    coverImage: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
    // Images: spotImagePaths,
    Images: [
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
      "https://cdn.pixabay.com/photo/2017/12/29/12/50/sunset-3047544_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg",
      "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg",
    ],
    Name: "Abc Farmhouse",
    Description: "Abc Farmhouse is Farmhouse",
    Amenities: [],
    Categories: [],
    Location: "Delhi",
    Type: "inside",
    Rules: [
      "No Smoking",
      "No Alcohol",
      "No Pets",
    ],
    CancelPolicy: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
    Price: 1000,
    MinGuest: 200,
    Timing: {
      Sunday: {
        open: "10:00",
        close: "20:00",
      },
      Monday: {
        open: "10:00",
        close: "20:00",
      },
      Tuesday: {
        open: "10:00",
        close: "20:00",
      },
    },
  });

  async function addSpotManually(){
    try {
      const newSpot = await spot.save();
      console.log(newSpot);
    } catch (error) {
      console.log(error);
    }
  }

  async function addReview(){
    try{
      const review = ""
      await reviewSchema.create( {
        spotId: "64494b75e51ac7214d160a13",
        // clientName: "Koustav Kanak",
        client: '641c5254c9adbd0700c986bc',
        rating: 4,
        review: "I recently rented this marriage hall for my daughter's wedding and I have to say, I was thoroughly impressed with the venue. The hall itself was spacious and beautifully decorated, with ample seating for all of our guests. ",
      } )
    } catch(error){
      console.log(error);
    }
  }

  // addReview()

const stripe = require('stripe')('sk_test_51N4ogxSHVjxzSS7rw1ZGtIG62M4Ur7b7b7R7oq3byZUSE9Ku4F55SOAgPiSYjgINC1tNXBm6a0dbArf4m4dMN8mL00QFfpNXQA');

app.post('/create-checkout-session', async (req, res) => {

  console.log(req.body)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    name: req.body.name,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'usd',
          product: 'prod_NrFtZZivKlb61V',
          unit_amount: req.body.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/postPayment/success`,
    cancel_url: `http://localhost:3000/postPayment/failed`,
  })


  res.redirect(303, session.url);
});


