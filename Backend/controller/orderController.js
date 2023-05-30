const nodemailer = require("nodemailer");
const fs = require("fs");
const easyinvoice = require("easyinvoice");
const spotSchema = require("../schema/spotSchema");
const reviewSchema = require("../schema/reviewSchema");
const sellerSchema = require("../schema/sellerSchema");
const orderSchema = require("../schema/orderSchema");
const { default: mongoose } = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const userSchema = require("../schema/userSchema");


exports.bookSpot = async (req, res) => {
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
      res.status(500).json({
          success: false,
          message: "Internal Server Error",
          err: err.message,
      })
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


    //   const data3 = {
    //     shipping: {
    //         name: 'John Doe',
    //         address: '1234 Main Street',
    //         city: 'San Francisco',
    //         state: 'CA',
    //         country: 'US',
    //         postal_code: 94111,
    //     },
    //     items: [
    //         {
    //             item: 'TC 100',
    //             description: 'Toner Cartridge',
    //             quantity: 2,
    //             amount: 6000,
    //         },
    //         {
    //             item: 'USB_EXT',
    //             description: 'USB Cable Extender',
    //             quantity: 1,
    //             amount: 2000,
    //         },
    //     ],
    //     subtotal: 8000,
    //     paid: 0,
    //     invoice_nr: 1234,
    // }
    // try{
    // const result = await easyinvoice.createInvoice(data);
    // console.log("Rresult", result.pdf)
    // fs.writeFileSync(`../invoices/${spotId}_${user}_invoice.pdf`, result.pdf, "base64");
    // // easyinvoice.download("invoice.pdf", result.pdf);
    // } catch(err){
    //     console.log(err)
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal Server Error",
    //         err: err.message,
    //     })
    // }

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

  res.status(200).json({
    success: true,
    message: "Spot Booked Successfully",
    order,
  })
}

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
      const userDetails = (await userSchema.findById(user))
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

  let allBookings = []
  // getting this month's orders
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const orders = await orderSchema.find({createdAt: {$gte: new Date(thisYear, thisMonth, 1)}})

  await Promise.all(orders.map(async (order) => {
    const spot = await spotSchema.findById(order.spotId)
    const listerName = (await userSchema.findById(spot.lister))?.firstName + " " + (await userSchema.findById(spot.lister))?.lastName
    allBookings.push({
      spotName: spot.Name,
      spotAddress: spot.Location,
      lister: listerName,
      user: order.client,
      price: order.priceSpot,
      date: order.createdAt.toDateString()
    })
  }))

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    allBookings,
  })
}

exports.getMyUserBookings = async (req, res) => {
  const user = req.params.userId

  // const orders = await orderSchema.find({client: user})

  let allBookings = []

  // getting this month's orders
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const orders = await orderSchema.find({client: user, createdAt: {$gte: new Date(thisYear, thisMonth, 1)}})

  try {
    await Promise.all(orders.map(async (order) => {
      const spot = await spotSchema.findById(order.spotId)
  
      allBookings.push({
        spotName: spot.Name,
        spotAddress: spot.Location,
        lister: spot.lister,
        user: order.client,
        price: order.priceSpot,
        date: order.createdAt.toDateString(),
        maxGuests: order.maxGuest,
        invoice: `http://localhost:5000/invoices/${order.spotId}_${order.client}_invoice.pdf`
      })
    }))
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      allBookings,
    })
  } catch(err){
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    })
  }
}

exports.getMostBooked10Spots = async (req, res) => {
  const spots = await spotSchema.find({})

  let allBookings = []
  // getting this month's orders
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const orders = await orderSchema.find({createdAt: {$gte: new Date(thisYear, thisMonth, 1)}})

  await Promise.all(orders.map(async (order) => {
    const spot = await spotSchema.findById(order.spotId)
    const listerName = (await userSchema.findById(spot.lister))?.firstName + " " + (await userSchema.findById(spot.lister))?.lastName
    allBookings.push({
      spotName: spot.Name,
      spotAddress: spot.Location,
      lister: listerName,
      user: order.client,
      price: order.priceSpot,
      bookedDate: order.createdAt,
    })
  }))

  // most booked spots schema is {spotName, spotName, price, listername, noOfBookings}

  const mostBooked = allBookings.reduce((acc, curr) => {
    if(acc[curr.spotName]){
      // acc[curr.spotName] += 1
      // Adding spotaddress, price, listername
      acc[curr.spotName] = {
        spotName: curr.spotName,
        spotAddress: curr.spotAddress,
        price: curr.price,
        lister: curr.lister,
        noOfBookings: acc[curr.spotName].noOfBookings+1
      }
    } else {
      acc[curr.spotName] = 1
      // Adding spotaddress, price, listername
      acc[curr.spotName] = {
        spotName: curr.spotName,
        spotAddress: curr.spotAddress,
        price: curr.price,
        lister: curr.lister,
        noOfBookings: 1
      }
    }
    return acc
  }, {})



  // const mostBooked = allBookings.reduce((acc, curr) => {
  //   if(acc[curr.spotName]){
  //     acc[curr.spotName] += 1
  //   } else {
  //     acc[curr.spotName] = 1
  //   }
  //   return acc
  // }, {})

  const mostBookedArr = Object.entries(mostBooked).sort((a, b) => b[1] - a[1]).slice(0, 10)


  res.status(200).json({
    success: true,
    message: "Most Booked Spots fetched successfully",
    mostBookedArr,
  })
}

exports.getMostBookedListers = async (req, res) => {
  const spots = await spotSchema.find({})

  let allBookings = []
  // getting this month's orders
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const orders = await orderSchema.find({createdAt: {$gte: new Date(thisYear, thisMonth, 1)}})

  await Promise.all(orders.map(async (order) => {
    const spot = await spotSchema.findById(order.spotId)
    const listerName = (await userSchema.findById(spot.lister))?.firstName + " " + (await userSchema.findById(spot.lister))?.lastName
    const noOfListings = await spotSchema.find({lister: spot.lister}).countDocuments()
    const totalEarnings = (await orderSchema.find({lister: spot.lister})).reduce((acc, curr) => acc + curr.priceSpot, 0)
    allBookings.push({
      spotName: spot.Name,
      spotAddress: spot.Location,
      lister: listerName,
      user: order.client,
      price: order.priceSpot,
      bookedDate: order.createdAt,
      noOfListings: noOfListings,
      totalEarnings: totalEarnings
    })
  }))

  // most booked spots schema is {spotName, spotName, price, listername, noOfBookings}

  const mostBookedListers = allBookings.reduce((acc, curr) => {
    if(acc[curr.lister]){
      // acc[curr.spotName] += 1
      // Adding spotaddress, price, listername
      acc[curr.lister] = {
        lister: curr.lister,
        noOfListings: curr.noOfListings,
        totalEarnings: curr.totalEarnings,
        noOfBookings: acc[curr.lister].noOfBookings+1
      }
    } else {
      acc[curr.lister] = 1
      // Adding spotaddress, price, listername
      acc[curr.lister] = {
        lister: curr.lister,
        noOfListings: curr.noOfListings,
        totalEarnings: curr.totalEarnings,
        noOfBookings: 1
      }
    }
    return acc
  }, {})
  const mostBookedListersArr = Object.entries(mostBookedListers).sort((a, b) => b[1] - a[1]).slice(0, 10)

  res.status(200).json({
    success: true,
    message: "Most Booked Listers fetched successfully",
    mostBookedListersArr,
  })
}