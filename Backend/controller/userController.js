// const couponsSchema = require("../schema/couponsSchema");
const orderSchema = require("../schema/orderSchema");
const userSchema = require("../schema/userSchema");
const Otp = require("../schema/otps");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const basePath = path.join(
        __dirname,
        `../uploads/profile-pic/${req.params.userId}`
      );

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      cb(null, basePath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `profile-picture-${Date.now()}.${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage }).fields([{ name: "profile-pic" }]);



// >> Register Admin
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    console.table([{ firstName, lastName, emailId, password }]);
    // check email already exist ?
    const checkEmailExists = await userSchema.findOne({ emailId });

    if (checkEmailExists) {
      console.log("hai chal rha hai");
      console.log(checkEmailExists);
      return res
        .status(404)
        .json({ success: false, message: "Sorry Email already in use" });
    }

    const user = await userSchema.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOtp = async (req, res) => {
  const genRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  const { emailId } = req.body;
  const otp = genRandomOtp();

  ejs.renderFile(
    path.join(__dirname, "../views/", "otp.ejs"),
    { otp: otp },
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
            `./otps/${emailId.toString().split("@")[0]}_otp.pdf`,
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

  // // send the mail using the transporter
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Error sending OTP",
      });
    } else {
      console.log("Email sent: " + info.response);
      console.log("Sent to: ", userDetails.emailId);
      await Otp.create({
        emailId: userDetails.emailId,
        otp: otp,
      });
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    }
  });
};

exports.verifyOtp = async (req, res) => {
  const { emailId, otp } = req.body;

  const result = await Otp.findOne({ emailId, otp });
  if (!result) {
    res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  }
};

// >> Login Admin
exports.userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userSchema.findOne({ emailId }).select("+password");
    console.log(user);

    if (user?.verified === false) {
      return res.status(200).json({
        success: false,
        message: "Pls verify you're email first",
        user: {
          _id: user._id,
          email: user.emailId,
          verified: false,
        },
      });
    }

    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.isEmailVerified = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ emailId: email });

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

exports.requestEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ emailId: email });

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
    const user = await userSchema.findOne({ emailId: email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "No user is associated with this email",
      });
    const token = jwt.sign(
      { id: user._id.toString(), verified: user?.verified ?? false, email: user.emailId },
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
                 <a href="http://localhost:5000/user/auth/reset-password?token=${token}" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
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

    res.status(200).json({
      success: true,
      message: "Successfully email sent",
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.requestPasswordChangeOnForgotPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.query;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id, verified } = payload;
    if (!verified)
      return res
        .status(404)
        .json({ success: false, message: "User is not verified" });
    const user = await userSchema.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No records found with this creds" });
    const cryptedPassword = await bcrypt.hash(password, 10);
    const updateUser = await userSchema.findByIdAndUpdate(id, {
      password: cryptedPassword,
    });
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

// exports.userLogin = async (req, res) => {
//     try {
//     const { emailId, password } = req.body;
//     const user = await userSchema.findOne({ emailId }).select("+password");
//     console.log(user)
//     if (!user) {
//         res.status(401).json({
//             success: false,
//             message: "Invalid email or password"
//         })
//     }

//     const isPasswordMatched = await user.comparePassword(password)

//     if (!isPasswordMatched) {
//         res.status(401).json({
//             success: false,
//             message: "Invalid email or password"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         user: "user",
//         user
//     })
//     } catch (error) {
//         console.log(error)
//     }
// }

//get All users

exports.allUsers = async (req, res) => {
  let user = [...(await userSchema.find())];
  console.log(user);
  if (!user) {
    res.status(401).json({
      success: false,
      message: "No users found",
    });
  }

  // Adding total spots booked and current bbokings to each user object in user list
  for (let i = 0; i < user.length; i++) {
    // const totalSpotsBooked = await orderSchema.find({ client: user[i]._id }).countDocuments()
    // const currentBookings = await orderSchema.find({ client: user[i]._id, status: "Booked" }).countDocuments()
    // Keeping the values random
    user[i].totalBookings = Math.floor(Math.random() * 10);
    user[i].currentBookings = [
      "Apex Mall",
      "City Center",
      "Forum Mall",
      "Mani Square",
    ][Math.floor(Math.random() * 4)];
  }
  console.log(user);

  res.status(200).json({
    success: true,
    user: "user",
    user,
  });
};

//update user
exports.updateUser = async (req, res) => {
  const { id, isActive } = req.body;

  const user = userSchema.findByIdAndUpdate(
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

exports.getNotifications = async (req, res) => {
  console.log("Notif reqs", req.query);
  try {
    const user = await userSchema.findById(req.query.id);
    console.log(user);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "No user found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Notifications fetched successfully",
        notifications: user?.notifications,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// exports.checkCoupon = async (req, res) => {
//   const { couponCode, price } = req.body;
//   // const user = req.body.userId
//   console.log("Coupon req", req.body);

//   const coupons = await couponsSchema.findOne({ couponCode });
//   if (!coupons) {
//     res.status(401).json({
//       success: false,
//       message: "No coupon found",
//     });
//   } else {
//     if (coupons.couponExpiry < Date.now()) {
//       res.status(401).json({
//         success: false,
//         message: "Coupon expired",
//       });
//     } else {
//       // const couponType = coupons.couponType
//       // const couponValue = coupons.couponValue
//       // const couponMinOrder = coupons.couponMinOrder
//       // const couponMaxDiscount = coupons.couponMaxDiscount
//       const { couponType, couponValue, couponMinOrder, couponMaxDiscount } =coupons;

//       if (price < couponMinOrder) {
//         res.status(401).json({
//           success: false,
//           message: "Minimum order value is " + couponMinOrder,
//         });
//       } else {
//         if (couponType === "flat") {
//           if (couponValue > couponMaxDiscount) {
//             res.status(401).json({
//               success: false,
//               message: "Coupon value exceeds maximum discount",
//             });
//           } else {
//             const finalPrice = price - couponValue;
//             res.status(200).json({
//               success: true,
//               message: "Coupon applied successfully",
//               finalPrice,
//             });
//           }
//         } else {
//           const finalPrice = price - price * (couponValue / 100);
//           res.status(200).json({
//             success: true,
//             message: "Coupon applied successfully",
//             finalPrice,
//           });
//         }
//       }
//     }
//   }
// };

exports.putProfilePicture = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.err(err);
      } else {
        const user = await userSchema.findById(req.params.userId);
        if (!user)
          return res.status(404).json({
            success: false,
            message: "No records found associated",
          });

        const basePath = path.join(
          "/uploads",
          `/profile-pic/${req.params.userId}`,
          req.files['profile-pic'][0].filename
        );

        user.profilePic = basePath;

        await user.save();

        res.status(200).json({
          success: true,
          message: "profie pic successfully updated",
        });
      }
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};


exports.sendMailVerification = async (req, res) => {
  try {
    const { emailId } = req.body;
    console.log(
      "-------------------------------------------verification----------------------------------------------------"
    );
    const user = await userSchema.findOne({ emailId })
    if(!user) {
      return res
      .status(404)
      .json({
        success: false,
        message: 'No records found associated with this creds'
      })
    }
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 10,
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
      to: `<${emailId}>`,
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
           emailId.split("@")[0]
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
                 <a href="http://localhost:5000/verify/email?token=${token}&role=user" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
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
      `magic link :- http://localhost:5000/api/verify-email/${token}`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMyBookedSpots = async (req, res) => {
  try {
    const orders = await orderSchema.find({ client: req.params.id }).populate('spotId').populate('client')
    if(!orders) {
      return res
      .status(404)
      .json({
        success: false,
        message: 'No records found'
      })
    }
    res
    .json({
      success: true,
      orders
    })
  } catch (err) {
    res
    .status(500)
    .json({
      success: false
    })                              
  }
}