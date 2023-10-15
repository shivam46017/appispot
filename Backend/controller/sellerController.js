const sellerSchema = require("../schema/sellerSchema");
const spotSchema = require("../schema/spotSchema");
const multer = require("multer");
const path = require("path");
const amenitySchema = require("../schema/amenitySchema");
const categorySchema = require("../schema/categorySchema");

const fs = require("fs");
const reviewSchema = require("../schema/reviewSchema");
const { json } = require("body-parser");
const { PasswordResponses } = require("pdfjs-dist");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "docImages") {
      const basePath = path.join(__dirname, "../docs", req.params.sellerid);

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      cb(null, basePath);
    }

    if (file.fieldname === "spotImages") {

      const basePath = path.join(
        __dirname,
        "../uploads/spotImages/",
        req.params.sellerid
      );
  
      if (fs.existsSync(!basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      cb(null, basePath);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "spotImages" },
  { name: "docImages" },
]);

// >> Register Admin
exports.createSeller = async (req, res) => {
  try {
    console.log("Creating seller");
    const { firstName, lastName, emailId, password } = req.body;

    const Seller = await sellerSchema.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    res.status(200).json({
      success: true,
      Seller,
    });
  } catch (error) {
    console.log("Some Error occurred");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// >> Login Seller
exports.SellerLogin = async (req, res) => {
  console.log("Logging");
  const { emailId, password } = req.body;

  const Seller = await sellerSchema.findOne({ emailId }).select("+password");

  if(!Seller?.isVerified || Seller.isVerified === false) {
    return res.status(404).json({
      success: false,
      message: "very you're email first",
      isVerified: false,
      id: Seller._id,
      name: Seller.firstName + " " + Seller.lastName,
    })
  }

  console.log(Seller)
  if (!Seller) {
    console.log("No seller exists");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isPasswordMatched = await Seller.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("Password didn;t match");
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } else {
    console.log("Successful");
    res.status(200).json({
      success: true,
      user: "seller",
      Seller,
    });
  }
};

//get All Seller
exports.allSeller = async (req, res) => {
  const Seller = await sellerSchema.find({}).select("-password");
  console.log(Seller);
  if (!Seller) {
    res.status(401).json({
      success: false,
      message: "No Seller found",
    });
  }

  res.status(200).json({
    success: true,
    user: "Seller",
    Seller,
  });
};

//update user
exports.updateSeller = async (req, res) => {
  const { id, isActive } = req.body;

  const Seller = sellerSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, data) {
      if (err) {
        res.status(401).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User Updated Successfully!",
          data,
        });
      }
    }
  );
};

exports.getAllSpot = async (req, res, next) => {
  try {
    let pageSize = 10;
    const { amenity, spotType, category, city, date, guests, area, page } =
      req.query ?? null;
    console.log(amenity, spotType, category, city, date, guests, area);

    if (amenity || category || spotType || city || date || guests || area) {
      let conditions = [{ isApproved: true }];

      if (amenity)
        conditions.push(
          Array.isArray(amenity)
            ? { Amenities: { $elemMatch: { _id: { $in: amenity } } } }
            : { Amenities: { $elemMatch: { _id: amenity } } }
        );
      if (category)
        conditions.push(
          Array.isArray(category)
            ? {
                Categories: { $elemMatch: { categoryName: { $in: category } } },
              }
            : { Categories: { $elemMatch: { categoryName: category } } }
        );
      if (spotType)
        conditions.push(
          Array.isArray(spotType)
            ? { Type: { $in: spotType } }
            : { Type: spotType }
        );
      if (city)
        conditions.push(
          Array.isArray(city) ? { Location: { $in: city } } : { Location: city }
        );
      if (date)
        conditions.push(
          Array.isArray(date)
            ? {
                BlockedTimings: {
                  $not: { $elemMatch: { date: { $in: date } } },
                },
              }
            : { BlockedTimings: { $not: { $elemMatch: { date } } } }
        );
      if (guests) conditions.push({ guests: { $lte: guests } });
      if (area)
        conditions.push({
          SqFt: { $lt: Number(area[1]), $gt: Number(area[0]) },
        });

      const spots = await spotSchema
        .find({ $and: conditions })
        .populate("Amenities")
        .populate("Categories")
        .exec();

      return res.status(200).json({
        success: true,
        spots,
      });
    } else {
      const spots = await spotSchema
        .find({ isApproved: true })
        .populate("Amenities")
        .populate("Categories")
        .exec();
      console.log(spots, "$$amenities");

      if (spots.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No spots found",
        });
      }

      res.status(200).json({
        success: true,
        spots,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.getSpot = async (req, res, next) => {
  try {
    const sellerId = req.params.sellerid;
    const page = parseInt(req.params.page);
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const seller = await sellerSchema.findById(sellerId).populate({
      path: "yourSpots",
      options: { skip: startIndex, limit: limit },
    });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const spots = seller.yourSpots;

    if (spots.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No spots found for this seller",
      });
    }

    res.status(200).json({
      success: true,
      yourSpots: spots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.createSpot = async (request, response) => {
  console.log("REQ: ", request.body);
  upload(request, response, async (err) => {
    if (err instanceof multer.MulterError) {
      response
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } else if (err) {
      response
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } else {
      const {
        Name,
        Description,
        Amenities,
        Categories,
        Location,
        type,
        SpotRules,
        CancelPolicy,
        Price,
        guests,
        Timing,
        lister,
        SqFt,
      } = request.body;
      console.log(request.body);

      const setSpotImages = () => {
        const sellerId = request.params.sellerid;
        const basePath = path.join(
          __dirname,
          "../uploads",
          "spotImages",
          sellerId
        );

        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }

        if (
          request.files["spotImages"].length === 0 ||
          !request.files["spotImages"]
        )
          return;
        const spotImages = request.files["spotImages"];
        const spotImagePaths = spotImages.map((spotImage) => {
          const spotImagePath = path.join(basePath, spotImage.originalname);
          return `/uploads/spotImages/${sellerId}/${spotImage.originalname}`;
        });
        return spotImagePaths;
      };

      const setSpotDocs = () => {
        const sellerId = request.params.sellerid;
        const basePath = path.join(__dirname, "../docs", sellerId);

        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }

        const spotDocs = request.files["docImages"];
        const spotDocPaths = spotDocs.map((spotDoc) => {
          return `/docs/${sellerId}/${spotDoc.originalname}`;
        });
        return spotDocPaths;
      };

      const spot = new spotSchema({
        docs: setSpotDocs(),
        Images: setSpotImages(),
        Name,
        Description,
        Amenities: JSON.parse(Amenities),
        Categories: JSON.parse(Categories),
        Location: JSON.parse(Location),
        Type: type,
        Rules: JSON.parse(SpotRules),
        CancelPolicy,
        Price,
        guests,
        Timing: JSON.parse(Timing),
        lister,
        SqFt,
      });

      try {
        const savedSpot = await spot.save();
        const seller = await sellerSchema.findOneAndUpdate(
          { _id: request.params.sellerid },
          { $push: { yourSpots: savedSpot._id } },
          { new: true }
        );

        response.status(200).json({
          success: true,
          seller,
          message: "Seller spot updated successfully!",
        });
      } catch (err) {
        console.log(err);
        response.status(400).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    }
  });
};

exports.getAmenitiesAndCategories = async (req, res) => {
  try {
    const amenities = await amenitySchema.find({});
    const categories = await categorySchema.find({});
    res.status(200).json({
      success: true,
      amenities,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await categorySchema.find();
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category found successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await amenitySchema.find();
    if (!amenities) {
      res.status(404).json({
        success: false,
        message: "Amenities not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Amenities found successfully",
      amenities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSpotID = async (req, res) => {
  try {
    const spot = await spotSchema
      .findById(req.params.id)
      .populate("Amenities")
      .populate("Categories")
      .populate('lister', 'firstName lastName')
      .exec();
    const reviews = await reviewSchema.find({ spotId: req.params.id });
    res.status(200).json({
      success: true,
      spot,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSellerOrderedSpots = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.id);

    // const spots = await spotSchema.find({ _id: { $in: seller.yourSpots } });
    // Also checking if the spot booked date is greater than today's date
    // const spots = await spotSchema.fnd({ _id: { $in: seller.yourSpots }, "bookedDates.date": { $gte: new Date() } });
    // Booked spots will be in Orders schema not in spot schema
    // Spot schema has spotId, we'll have to check if the spot id in orders is in sellers yourSpots array and also, if ordered date is greater than today's date
    const spots = await spotSchema
      .find({ _id: { $in: seller.yourSpots } })
      .populate("Amenities")
      .populate("Categories")
      .exec();
    const orders = await orderSchema.find({
      spotId: { $in: seller.yourSpots },
    });
    const filteredSpots = spots.filter((spot) => {
      const order = orders.find(
        (order) => order.spotId.toString() === spot._id.toString()
      );
      if (order) {
        return order.bookedDates.find((date) => date.date >= new Date());
      } else {
        return false;
      }
    });

    res.status(200).json({
      success: true,
      filteredSpots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMySpots = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.sellerid);
    const spots = await spotSchema
      .find({ _id: { $in: seller.yourSpots } })
      .populate("Amenities")
      .populate("Categories")
      .exec();
    res.status(200).json({
      success: true,
      spots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.sellerid);
    const orders = await orderSchema.find({
      spotId: { $in: seller.yourSpots },
    });
    const filteredOrders = orders.filter((order) => {
      return order.bookedDates.find((date) => date.date >= new Date());
    });

    res.status(200).json({
      success: true,
      filteredOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.requestEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await sellerSchema.findOne({ emailId: email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No records found with this creds" });

    if (!user.verified)
      return res
        .status(404)
        .json({ success: false, message: "Email already in use and verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 10,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.requestForgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await sellerSchema.findOne({ emailId: email });
    if(!user) return res.status(404).json({
      success: false,
      message: 'No user is associated with this email'
    })  
    const token = jwt.sign(
      { id: user._id.toString(), verified: user?.isVerified ?? false, email: user.emailId },
      process.env.JWT_SECRET
    );
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

    let info = await transporter.sendMail({
      from: '"Shivam Pal" <verify@appispot.com>',
      to: `<${email}>`,
      subject: "Appispot Email Verification",
      text: "Email Verficaition",
      html: `<head>
         <title></title>
         <!--[if !mso]><!-- -->
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <!--<![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <style type="text/css">
         #outlook a { padding: 0; }
         .ReadMsgBody { width: 100%; }
         .ExternalClass { width: 100%; }
         .ExternalClass * { line-height:100%; }
         body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
         table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
         img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
         p { display: block; margin: 13px 0; }
       </style>
       <!--[if !mso]><!-->
       <style type="text/css">
         @media only screen and (max-width:480px) {
           @-ms-viewport { width:320px; }
           @viewport { width:320px; }
         }
       </style>
       <!--<![endif]-->
       <!--[if mso]>
       <xml>
         <o:OfficeDocumentSettings>
           <o:AllowPNG/>
           <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
       </xml>
       <![endif]-->
       <!--[if lte mso 11]>
       <style type="text/css">
         .outlook-group-fix {
           width:100% !important;
         }
       </style>
       <![endif]-->
       
       <!--[if !mso]><!-->
           <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
           <style type="text/css">
       
               @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
       
           </style>
         <!--<![endif]--><style type="text/css">
         @media only screen and (min-width:480px) {
           .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
         }
       </style>
       </head>
       <body style="background: #F9F9F9;">
         <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]-->
         <style type="text/css">
           html, body, * {
             -webkit-text-size-adjust: none;
             text-size-adjust: none;
           }
           a {
             color:#1EB0F4;
             text-decoration:none;
           }
           a:hover {
             text-decoration:underline;
           }
         </style>
       <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
             <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
               <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
               <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
             <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
             <![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Welcome To Appispot!</div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table><!--[if mso | IE]>
               </v:textbox>
             </v:rect>
             <![endif]--></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                   <p><img src="http://localhost:5000/logo.png" alt="Party Wumpus" title="None" width="200" style="height: auto;"></p>
       
         <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey ${
           email.split("@")[0]
         },</h2>
         <p>Oops! It seems like you’ve forgotten your password for appispot! Don’t worry, it happens to the best of us.</p> <p>To reset your password, please click on the link that we’ve sent to your registered email address.</p><p>Oops! It seems like you’ve forgotten your password for appispot! Don’t worry, it happens to the best of us.</p> <p>To reset your password, please click on the link that we’ve sent to your registered email address.</p>
                 </div>
                 </td>
                 </tr>
                 <tr>
                 <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                 <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                 <tbody>
                 <tr>
                 <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA">
                 <a href="http://localhost:5173/lister/auth/reset-password?token=${token}" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                   Reset Password
                 </a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
             Sent by appispot
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></div>
       
       </body>`,
    });

    console.log(
      "----------------------forgot-password------------------------"
    );
    console.log("\nmessage Id :-" + info.messageId);

    res
    .status(200)
    .json({
      success: true,
      message: 'Successfully email sent'
    })
  } catch (err) {
    console.log(err)
    res
    .status(500)
    .json({
      success: false,
      message: "Internal Server Error"
    })
  }
};

exports.requestPasswordChangeOnForgotPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.query;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = payload;
    const user = await sellerSchema.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No records found with this creds" });
    const cryptedPassword = await bcrypt.hash(password, 10)
    const updateUser = await sellerSchema.findByIdAndUpdate(id, { password: cryptedPassword });
    if (!updateUser)
      return res.status(404).json({
        success: false,
        message: "Request failed because of internal server errors",
      });
    res.status(200).json({
      success: true,
      message: "Successfully password has been changed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.isEmailVerified = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await sellerSchema.findOne({ emailId: email });

    if (user.comparePassword(password))
      return res.status(404).json({
        success: false,
        message: "No records found with this creds",
      });

    if (user) {
      res.status(200).json({
        success: true,
        verified: user.verified,
        message: "User email is verified",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.sendMailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(
      "-------------------------------------------verification----------------------------------------------------"
    );
    const token = jwt.sign({ id: req.params.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 10,
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Link Expired",
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
        ciphers: "SSLv3",
      },
    });
    let info = await transporter.sendMail({
      from: '"Shivam Pal" <verify@appispot.com>',
      to: `<${email}>`,
      subject: "Appispot Email Verification",
      text: "Email Verficaition",
      html: `<head>
         <title></title>
         <!--[if !mso]><!-- -->
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <!--<![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <style type="text/css">
         #outlook a { padding: 0; }
         .ReadMsgBody { width: 100%; }
         .ExternalClass { width: 100%; }
         .ExternalClass * { line-height:100%; }
         body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
         table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
         img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
         p { display: block; margin: 13px 0; }
       </style>
       <!--[if !mso]><!-->
       <style type="text/css">
         @media only screen and (max-width:480px) {
           @-ms-viewport { width:320px; }
           @viewport { width:320px; }
         }
       </style>
       <!--<![endif]-->
       <!--[if mso]>
       <xml>
         <o:OfficeDocumentSettings>
           <o:AllowPNG/>
           <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
       </xml>
       <![endif]-->
       <!--[if lte mso 11]>
       <style type="text/css">
         .outlook-group-fix {
           width:100% !important;
         }
       </style>
       <![endif]-->
       
       <!--[if !mso]><!-->
           <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
           <style type="text/css">
       
               @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
       
           </style>
         <!--<![endif]--><style type="text/css">
         @media only screen and (min-width:480px) {
           .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
         }
       </style>
       </head>
       <body style="background: #F9F9F9;">
         <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]-->
         <style type="text/css">
           html, body, * {
             -webkit-text-size-adjust: none;
             text-size-adjust: none;
           }
           a {
             color:#1EB0F4;
             text-decoration:none;
           }
           a:hover {
             text-decoration:underline;
           }
         </style>
       <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
             <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
               <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
               <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
             <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
             <![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Welcome To Appispot!</div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table><!--[if mso | IE]>
               </v:textbox>
             </v:rect>
             <![endif]--></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                   <p><img src="http://localhost:5000/logo.png" alt="Party Wumpus" title="None" width="200" style="height: auto;"></p>
       
         <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey ${
           email.split("@")[0]
         }, </h2>
         <p>Thank you for registering an account with appispot! We’re excited to have you on board.</p> <p>To ensure a smooth experience, we need to verify your email address. Please check your email for a verification link we’ve sent. Click on the link to complete the verification process.</p>       
                 </div>
                 </td>
                 </tr>
                 <tr>
                 <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                 <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                 <tbody>
                 <tr>
                 <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA">
                 <a href="http://localhost:5173/verify/email?token=${token}&role=lister" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                   Verify Email
                 </a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
             Sent by appispot
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></div>
       
       </body>`,
    });

    res.send(info.messageId);

    console.log("Message send: %s", info.messageId);
    console.log(
      `magic link :- http://localhost:5173/verify-email/${token}`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};