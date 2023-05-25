const discountSchema = require("../schema/discountSchema");
const couponSchema = require("../schema/couponsSchema");

exports.createCoupon = async (req, res) => {
  try {
    const {
      couponType,
      MinOrder,
      Code,
      Price,
      Description,
      offerValidTillDays,
    } = req.body;

    const endDate = new Date();
    endDate.setDate(endDate.getSeconds() + parseInt(offerValidTillDays));
    console.log(endDate);
    const coupon = await couponSchema.create({
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
    const { Code, price} = req.body;
    const code = await couponSchema.findOne({ Code });

    if (!code) {
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
      Price,
      Description,
      ExpiryInDays,
      venuesIds
        } = req.body;

    const EndDate = new Date();
    EndDate.setDate(EndDate.getDate() + parseInt(ExpiryInDays));
    const discount = await discountSchema.create({
      venueCategory,
      venuesIds,
      couponType,
      MinOrder,
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
    const { venueCategories, price, } = req.body;
     const code = await discountSchema.findOne({ venueCategory: { $in: venueCategories } });

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


exports.getAllCouponDiscount = async (req, res) => {
  // only for admin
  try {
    const coupons = await couponSchema.find();
    const discounts = await discountSchema.find();
    res.status(200).json({
      success: true,
      data: [...coupons, ...discounts],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong...!",
    });
  }
}