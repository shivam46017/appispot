const nodemailer = require("nodemailer");
const fs = require("fs");
const userSchema = require("../schema/userSchema");
const spotSchema = require("../schema/spotSchema");
const reviewSchema = require("../schema/reviewSchema");
const sellerSchema = require("../schema/sellerSchema");
const orderSchema = require("../schema/orderSchema");
const { default: mongoose } = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
require("dotenv").config();
const Tax = require('../schema/taxSchema')


const stripe = require("stripe")(
  "sk_test_51NZp9HSDv62iP5Dl9BXSlkrEYxkOWxw1ONOkU3VbNNTlkPVlkT6PDlw7Pljl1MXS8f8SiHerLEA4YnEMZW40wJ4o005mfaMHs1"
);

exports.bookSpot = async (req, res) => {
  const {
    spotId,
    startDate,
    endDate,
    unitAmount,
    maxGuests,
    startTime,
    endTime,
    userId,
    description,
    name,
  } = req.body;
  console.log(req.body);
  try {
    const customer = await stripe.customers.create({
      metadata: {
        user_id: userId,
        spot_id: spotId,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        max_guests: maxGuests,
        unit_amount: unitAmount,
      },
    });
    console.log(
      "process.env.STRIPE_REDICECT_URL",
      process.env.STRIPE_REDICECT_URL
    );
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.STRIPE_REDICECT_URL}/postPayment/success`,
      cancel_url: `${process.env.STRIPE_REDICECT_URL}/postPayment/failed`,
    });
    return res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    });
  }
};

exports.paymentConfirm = async (req, res) => {
  const endpointSecret =
    "whsec_6cf166e38b864fd32eecb834641e134139afc471f827eb48cfe1fe69cdd3d2cb";
  const sig = req.headers["stripe-signature"];
  let data;
  let eventType;
  if (endpointSecret) {
    let event;

    try {
      let body = req.body.toString();
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log("event verified", event);
      data = event.data.object;
      eventType = event.type;
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  } else {
    data = event.data.object;
    eventType = event.type;
  }

  if (eventType === "checkout.session.completed") {
    try {
      const customer = await stripe.customers.retrieve(data.customer);
      const {
        user_id,
        spot_id,
        start_date,
        end_date,
        start_time,
        end_time,
        max_guests,
        unit_amount,
      } = customer.metadata;
      const spot = await spotSchema.findById(spot_id);
      const cityTaxInfo = await Tax.findOne({ state: spot.Location.state })

      let userDetails = await userSchema.findById(user_id);
      if (!userDetails) {
        userDetails = await sellerSchema.findById(user_id);
      }

      console.log("HOGYAcustomer", customer.metadata);

      console.log(
        "HOGYA------------------spot",
        data.client_secret,
        data.payment_status,
        data.amount_total
      );

      const booking = await orderSchema.create({
        spotId: spot_id,
        date: {
          startDate: start_date,
          endDate: end_date,
        },
        time: {
          startDate: start_time,
          endDate: end_time,
        },
        client: user_id,
        maxGuest: max_guests,
        priceSpot: unit_amount,
        transactionDetails: {
          transactionId: data.id,
          transactionStatus: data.payment_status,
        },
      });

      console.log(booking);
      spot.BlockedTimings.push({
        start: start_time,
        end: end_time,
        date: start_date,
      });

      await spot.save();
      await userSchema.findByIdAndUpdate(
        {
          _id: customer.metadata.user_id,
        },
        {
          notifications: [
            ...userDetails.notifications,
            spot.Name + "Booking Successful!",
          ],
        }
      );
      // GENERATING THE INVOICE
      console.log(
        "Generating invoice for " +
          userDetails.firstName +
          " " +
          userDetails.lastName
      );

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
            tax: (spot.Price * (cityTaxInfo.cities.filter((value) => value.name === spot.Location.city)[0]).taxRate / 100).toFixed(2),
            serviceFee: (spot.Price * (cityTaxInfo.cities.filter((value) => value.name === spot.Location.city)[0]).serviceFee / 100).toFixed(2),
            total: unit_amount
          },
        ],
        subtotal: spot.Price,
        paid: spot.Price,
        invoice_nr: 1234,
        date: new Date().toISOString().slice(0, 10),
      };
      console.log("Invoice", invoice);
      // // Code for rendering the invoice as PDF goes here using pdf-creator-node or any other PDF generation library.
      // // MAILING THE INVOICE

      ejs.renderFile(
        path.join(__dirname, "../views/", "invoiceTemplate.ejs"),
        { invoice: invoice, guests: max_guests },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let options = {
              height: "12.5in",
              width: "8.5in",
              header: {
                height: "20mm",
              },
              footer: {
                height: "20mm",
              },
            };
            pdf
              .create(data, options)
              .toFile(
                `./invoices/${spot_id}_${userDetails.firstName}_${userDetails.lastName}_invoice.pdf`,
                function (err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("File created successfully");
                  }
                }
              );
          }
        }
      );

      try {
        const result = await easyinvoice.createInvoice(data);
        console.log("Rresult", result.pdf);
        fs.writeFileSync(
          `../invoices/${spot_id}_${userDetails.firstName}_${userDetails.lastName}_invoice.pdf`,
          result.pdf,
          "base64"
        );
        // easyinvoice.download("invoice.pdf", result.pdf);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          err: err.message,
        });
      }

      let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,   
        secure: false,
        auth: {
          user: "verify@appispot.com",
          pass: "Verify123",
        },
        tls: {
          ciphers: 'SSLv3'
        }
      });
      // // create the mail options
      const mailOptions = {
        from: "Shivam pal",
        to: userDetails.emailId,
        subject: "Booking Invoice from Appispot",
        text: "Please find attached the invoice for your purchase.",
        attachments: [
          {
            // filename: `./invoices/${spotId}_${user}_invoice.pdf`,
            path: `./invoices/${spot_id}_${userDetails.firstName}_${userDetails.lastName}_invoice.pdf`,
          },
        ],
      };
      // // send the mail using the transporter
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log("Sent to: ", userDetails.emailId);
        }
      });
      const order = await orderSchema.findOne({
        spotId: spot_id,
        client: user_id,
      });
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  }

  res.send().end();
};

exports.reviewSpot = async (req, res) => {
  const { spotId, rating, review } = req.body;
  const spot = await spotSchema.findById(spotId);
  const user = req.user
    ? req.user._id
    : req.body.userId
    ? req.body.userId
    : "koustav";

  if (!spot || !user) {
    res.status(401).json({
      success: false,
      message: "Invalid spot or user",
    });
  } else {
    const userDetails = await userSchema.findById(user);
    const reviewDB = await reviewSchema.create({
      spotId,
      rating,
      review,
      client: user,
      clientName: userDetails.firstName + " " + userDetails.lastName,
    });
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviewDB,
    });
  }
};

exports.getBookings = async (req, res) => {
  // const orders = await orderSchema.find({client: user})
  // ordersDetails schema = {spotName, spotAddress, lister, user, price, bookedDate}

  let allBookings = [];
  // getting this month's orders
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const orders = await orderSchema.find({
    createdAt: { $gte: new Date(thisYear, thisMonth, 1) },
  });

  await Promise.all(
    orders.map(async (order) => {
      const spot = await spotSchema.findById(order.spotId);
      const listerName =
        (await userSchema.findById(spot.lister))?.firstName +
        " " +
        (await userSchema.findById(spot.lister))?.lastName;
      allBookings.push({
        spotName: spot.Name,
        spotAddress: spot.Location,
        lister: listerName,
        user: order.client,
        price: order.priceSpot,
        date: order.createdAt.toDateString(),
      });
    })
  );

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    allBookings,
  });
};

exports.getMyUserBookings = async (req, res) => {
  const user = req.params.userId;

  // const orders = await orderSchema.find({client: user})

  let allBookings = [];

  // getting this month's orders
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const orders = await orderSchema.find({
    client: user,
    createdAt: { $gte: new Date(thisYear, thisMonth, 1) },
  });

  try {
    await Promise.all(
      orders.map(async (order) => {
        const spot = await spotSchema.findById(order.spotId);

        allBookings.push({
          spotName: spot.Name,
          spotAddress: spot.Location,
          lister: spot.lister,
          user: order.client,
          price: order.priceSpot,
          date: order.createdAt.toDateString(),
          maxGuests: order.maxGuest,
          invoice: `/invoices/${order.spotId}_${order.client}_invoice.pdf`,
        });
      })
    );
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      allBookings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    });
  }
};

exports.getMostBooked10Spots = async (req, res) => {
  const spots = await spotSchema.find({});

  let allBookings = [];
  // getting this month's orders
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const orders = await orderSchema.find({
    createdAt: { $gte: new Date(thisYear, thisMonth, 1) },
  });

  await Promise.all(
    orders.map(async (order) => {
      const spot = await spotSchema.findById(order.spotId);
      const listerName =
        (await userSchema.findById(spot.lister))?.firstName +
        " " +
        (await userSchema.findById(spot.lister))?.lastName;
      allBookings.push({
        spotName: spot.Name,
        spotAddress: spot.Location,
        lister: listerName,
        user: order.client,
        price: order.priceSpot,
        bookedDate: order.createdAt,
      });
    })
  );

  // most booked spots schema is {spotName, spotName, price, listername, noOfBookings}

  const mostBooked = allBookings.reduce((acc, curr) => {
    if (acc[curr.spotName]) {
      // acc[curr.spotName] += 1
      // Adding spotaddress, price, listername
      acc[curr.spotName] = {
        spotName: curr.spotName,
        spotAddress: curr.spotAddress,
        price: curr.price,
        lister: curr.lister,
        noOfBookings: acc[curr.spotName].noOfBookings + 1,
      };
    } else {
      acc[curr.spotName] = 1;
      // Adding spotaddress, price, listername
      acc[curr.spotName] = {
        spotName: curr.spotName,
        spotAddress: curr.spotAddress,
        price: curr.price,
        lister: curr.lister,
        noOfBookings: 1,
      };
    }
    return acc;
  }, {});

  // const mostBooked = allBookings.reduce((acc, curr) => {
  //   if(acc[curr.spotName]){
  //     acc[curr.spotName] += 1
  //   } else {
  //     acc[curr.spotName] = 1
  //   }
  //   return acc
  // }, {})

  const mostBookedArr = Object.entries(mostBooked)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  res.status(200).json({
    success: true,
    message: "Most Booked Spots fetched successfully",
    mostBookedArr,
  });
};

exports.getMostBookedListers = async (req, res) => {
  const spots = await spotSchema.find({});

  let allBookings = [];
  // getting this month's orders
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const orders = await orderSchema.find({
    createdAt: { $gte: new Date(thisYear, thisMonth, 1) },
  });

  await Promise.all(
    orders.map(async (order) => {
      const spot = await spotSchema.findById(order.spotId);
      const listerName =
        (await userSchema.findById(spot.lister))?.firstName +
        " " +
        (await userSchema.findById(spot.lister))?.lastName;
      const noOfListings = await spotSchema
        .find({ lister: spot.lister })
        .countDocuments();
      const totalEarnings = (
        await orderSchema.find({ lister: spot.lister })
      ).reduce((acc, curr) => acc + curr.priceSpot, 0);
      allBookings.push({
        spotName: spot.Name,
        spotAddress: spot.Location,
        lister: listerName,
        user: order.client,
        price: order.priceSpot,
        bookedDate: order.createdAt,
        noOfListings: noOfListings,
        totalEarnings: totalEarnings,
      });
    })
  );

  // most booked spots schema is {spotName, spotName, price, listername, noOfBookings}

  const mostBookedListers = allBookings.reduce((acc, curr) => {
    if (acc[curr.lister]) {
      // acc[curr.spotName] += 1
      // Adding spotaddress, price, listername
      acc[curr.lister] = {
        lister: curr.lister,
        noOfListings: curr.noOfListings,
        totalEarnings: curr.totalEarnings,
        noOfBookings: acc[curr.lister].noOfBookings + 1,
      };
    } else {
      acc[curr.lister] = 1;
      // Adding spotaddress, price, listername
      acc[curr.lister] = {
        lister: curr.lister,
        noOfListings: curr.noOfListings,
        totalEarnings: curr.totalEarnings,
        noOfBookings: 1,
      };
    }
    return acc;
  }, {});
  const mostBookedListersArr = Object.entries(mostBookedListers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  res.status(200).json({
    success: true,
    message: "Most Booked Listers fetched successfully",
    mostBookedListersArr,
  });
};
