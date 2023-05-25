const discountSchema = require("../schema/discountSchema");
const couponSchema = require("../schema/couponsSchema");

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
    const coupon = await couponSchema.create({
      sellerId,
      venueIds: venueId,
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      EndDate: endDate,
    });
    console.log(coupon);
    res.status(200).json({
      success: true,
      message: "Discount created successfully!",
      coupon,
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
    const code = await couponSchema.findOne({ Code });
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
        message: "Coupon expired.",
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
      message: "Coupon verified successfully!",
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
    const discount = await couponSchema.findByIdAndRemove(req.params.id);
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



exports.createDiscount = async (req, res) => {
  try {
    const {
      venueCategory,
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      ExpiryInDays,
    } = req.body;

    const EndDate = new Date();
    EndDate.setDate(EndDate.getDate() + ExpiryInDays);
    const discount = await discountSchema.create({
      venueCategory,
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      EndDate,
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

exports.discountVenues = async (req, res) => {
  try {
    const { venueCategory, price, } = req.body;
    const code = await discountSchema.findOne({ venueCategory });


    if (!code) {
      return res.status(401).json({
        success: false,
        message: "Invalid discount code.",
      });
    }
    if (code.EndDate < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Discount expired.",
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
      message: "Discount verified successfully",
      code,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await discountSchema.findByIdAndRemove(req.params.id);
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
