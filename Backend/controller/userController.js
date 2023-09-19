// const couponsSchema = require("../schema/couponsSchema");
const orderSchema = require("../schema/orderSchema");
const userSchema = require("../schema/userSchema");
const Otp = require("../schema/otps");

// >> Register Admin
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOtp = async (req, res) => {
  const genRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }
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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishalvishwajeet841@gmail.com",
      pass: "iyxsyadxqslsdwhs",
    },
  });
  // // create the mail options
  const mailOptions = {
    from: "vishalvishwajeet841@gmail.com",
    to: userDetails.emailId,
    subject: "OTP For Appispot Login",
    text: "",
    attachments: [
      {
        // filename: `./invoices/${spotId}_${user}_invoice.pdf`,
        path: `./otps/${emailId.toString().split("@")[0]}_otp.pdf`,
      },
    ],
  };
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
      })
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    }
  });

}

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
}

// >> Login Admin
exports.userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userSchema.findOne({ emailId }).select("+password");
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
    console.log(error);
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
