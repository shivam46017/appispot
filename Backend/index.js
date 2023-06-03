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

const order = require("./routes/orderRoutes");
const spotSchema = require("./schema/spotSchema");
const reviewSchema = require("./schema/reviewSchema");
// const couponsSchema = require("./schema/couponsSchema");
const discountCoupon = require("./routes/discountCouponRoute");
// use API routes
app.use("/api", admin);
app.use("/api", user);
app.use("/api", discountCoupon);

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
  });

  // const success = await stripe.checkout.sessions.retrieve(session.id)
  // console.log(success)
  // const event = stripe.webhooks.constructEvent(req.body, session.id, 'sk_test_51N4ogxSHVjxzSS7rw1ZGtIG62M4Ur7b7b7R7oq3byZUSE9Ku4F55SOAgPiSYjgINC1tNXBm6a0dbArf4m4dMN8mL00QFfpNXQA');
  // // Handle the checkout.session.completed event
  // if (event.type === 'checkout.session.completed') {
  //   console.log("Payment was successful.")
  //   const session = event.data.object;
  //   console.log(session)
  // } else {
  //   console.log("Payment was not successful.")
  // }

  const {
    spotId,
    // sellerId,
    name,
    startDate,
    endDate,
    price,
    maxGuests,
    startTime,
    endTime,
  } = req.body;
  console.log(req.body);
  const spot = await spotSchema.findById(spotId);
  console.log(spotId)
  console.log("SPOT", spot)
  const userDetails = await userSchema.findById(req.user ? req.user._id : req.body.userId ? req.body.userId : '641c521ec9adbd0700c986ba');
//   const seller = await sellerSchema.findById(sellerId);
  const user = req.user
  ? req.user._id
  : req.body.userId
  ? req.body.userId
  : "seller@gmail.com";
  console.log(spot);
//   console.log(seller);
  // console.log(user)
  if (!spot || !user) {
    res.status(401).json({
      success: false,
      message: "Invalid spot or seller or user",
    });
  }
  try{
    const booking = await orderSchema.create({
    spotId: spotId,
    date: {
      startDate: startDate,
      endDate: endDate,
    },
    time: {
      startDate: startTime,
      endDate: endTime,
    },
    client: req.user
      ? req.user._id
      : req.body.userId
      ? req.body.userId
      : '641c521ec9adbd0700c986ba',
    maxGuest: maxGuests,
    priceSpot: price,
  })
  await userSchema.findByIdAndUpdate(
    { _id: req.user ? req.user._id : req.body.userId ? req.body.userId : '641c521ec9adbd0700c986ba' },
    {
      notifications: [
        ...userDetails.notifications,
        spot.Name + "Booking Successful!",
      ],
    }
  )
}
  catch(err){
      console.log(err)
      // res.status(500).json({
      //     success: false,
      //     message: "Internal Server Error",
      //     err: err.message,
      // })
  }

    // GENERATING THE INVOICE
    console.log(
        "Generating invoice for " + userDetails.firstName + " " + userDetails.lastName
    )
    console.log(userDetails.emailId)
    console.log(spot.Name)
    console.log(price)
    console.log(spot.Description)
    

      const invoice = {
        shipping: {
          name: userDetails.firstName + " " + userDetails.lastName,
          address: userDetails.emailId,
          
        },
        items: [
          {
            item: spot.Name,
            address: spot.Location,
            description: spot.Description,
            amount: spot.Price,
          }
        ],
        subtotal: spot.Price,
        paid: spot.Price,
        invoice_nr: 1234,
        date: new Date().toISOString().slice(0, 10),
      }

      console.log("Invoice", invoice)

      ejs.renderFile(path.join(__dirname, '../views/', "invoiceTemplate.ejs"), {invoice: invoice, guests: maxGuests}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let options = {
                "height": "12.5in",
                "width": "8.5in",
                "header": {
                    "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toFile(`./invoices/${spotId}_${user}_invoice.pdf`, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("File created successfully");
                }
            });
        }
    });

    // MAILING THE INVOICE
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishalvishwajeet841@gmail.com",
      pass: "iyxsyadxqslsdwhs",
    },
  });


  // create the mail options
  const mailOptions = {
    from: "vishalvishwajeet841@gmail.com",
    to: userDetails.emailId,
    subject: "Booking Invoice from Appispot",
    text: "Please find attached the invoice for your purchase.",
    attachments: [
      {
        // filename: `./invoices/${spotId}_${user}_invoice.pdf`,
        path: `./invoices/${spotId}_${user}_invoice.pdf`,
      },
    ],
  };

  // send the mail using the transporter
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log("Sent to: ", userDetails.emailId)
    }
  });

  const order = await orderSchema.findOne({spotId: spotId, client: user})


  res.redirect(303, session.url);

});


