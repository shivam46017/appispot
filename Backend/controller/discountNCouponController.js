const discountCouponSchema = require("../schema/discountCouponSchema");

exports.createCoupon = async (req, res) => {
  try {
    const {
       sellerId,
      venueId,
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      offerValidTillDays,
    } = req.body;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + offerValidTillDays);
    const discount = await discountCouponSchema.create({
      sellerId,
      venueIds: venueId,
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      EndDate: endDate,
    });
    console.log(discount);
    res.status(200).json({
      success: true,
      message: "Discount created successfully!",
      discount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wrong...!",
    });
  }
};

exports.verifyCoupon = async (req, res) => {
  try {
    const { Code, price, venueId} = req.body;
    console.log(venueId);
    const code = await discountCouponSchema.findOne({ Code });
    const validVenue = code.venueIds.includes(venueId);

    if (!code || !validVenue) {
      return res.status(401).json({
        success: false,
        message: "Invalid discount code.",
      });
    }
    if (code.EndDate < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Discount code expired.",
      });
    }
    if (price < code.MinOrder) {
      return res.status(401).json({
        success: false,
        message: "Minimum order value not reached.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Discount code verified successfully!",
      couponDetails: code,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const discount = await discountCouponSchema.findByIdAndRemove(req.params.id);
    if (!discount) {
      res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// exports.createDiscount = async (req, res) => {
//   try {
//     const {
//       sellerId,
//       venueId,
//       discountPercentage,
//       discountCode,
//       discountDescription,
//     } = req.body;

//     const endDate = new Date();
//     endDate.setDate(endDate.getDate() + 5);
//     const discount = await discountCouponSchema.create({
//       sellerId,
//       venueId,
//       discountPercentage,
//       discountCode,
//       discountDescription,
//       discountEndDate: endDate,
//     });
//     console.log(discount);
//     res.status(200).json({
//       success: true,
//       message: "Discount created successfully!",
//       discount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Something wrong...!",
//     });
//   }
// };

// exports.verifyDiscount = async (req, res) => {
//   try {
//     const { discountCode, price } = req.body;
//     const code = await discountCouponSchema.findOne({ discountCode });

//     if (!code) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid discount code.",
//       });
//     }
//     if (code.discountEndDate < new Date()) {
//       return res.status(401).json({
//         success: false,
//         message: "Discount code expired.",
//       });
//     }
//     if (price < code.discountMinOrder) {
//       return res.status(401).json({
//         success: false,
//         message: "Minimum order value not reached.",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Discount code verified successfully!",
//       code,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong.",
//     });
//   }
// };

// exports.deleteDiscount = async (req, res) => {
//   try {
//     const discount = await discountCouponSchema.findByIdAndRemove(req.params.id);
//     if (!discount) {
//       res.status(404).json({
//         success: false,
//         message: "Discount not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Discount deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
