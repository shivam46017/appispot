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
    const { Code, price } = req.body;
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
      venuesIds,
      seller
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
      createdBy: seller
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
    const { venueCategories, venueId, price } = req.body;
    console.log(venueCategories, venueId, price);

    const admin = await discountSchema.find({
      venueCategory: { $in: venueCategories },
    });
    const lister = await discountSchema.find({
      venuesIds: { $in: venueId },
    });
    const adminDiscount = admin[admin.length-1];
    const listerDiscount = lister[lister.length-1];
    if (!adminDiscount && !listerDiscount) {
      return res.status(401).json({
        success: false,
        message: "No discount available.",
      });
    }
    let discount = {
      couponType: adminDiscount!=null?adminDiscount.couponType:listerDiscount.couponType,
      Price: adminDiscount!=null?adminDiscount.Price:listerDiscount.Price,
      MinOrder: adminDiscount!=null?adminDiscount.MinOrder:listerDiscount.MinOrder,
    };

    if (adminDiscount!=null && listerDiscount!=null) {
      if (!(adminDiscount.EndDate < new Date() || listerDiscount.EndDate < new Date())) {
        let discountPrice = 0;
        if (adminDiscount.couponType === "flat" && listerDiscount.couponType === "flat") {
          discountPrice= adminDiscount.Price+ listerDiscount.Price;
        }
        else if (adminDiscount.couponType === "percent" && listerDiscount.couponType === "percent") {
          discountPrice= (price * adminDiscount.Price) / 100 + (price * listerDiscount.Price) / 100;
        }
        else if (adminDiscount.couponType === "percent" && listerDiscount.couponType === "flat") {
          discountPrice= (price * adminDiscount.Price) / 100 + listerDiscount.Price;
        }
        else if (adminDiscount.couponType === "flat" && listerDiscount.couponType === "percent") {
          discountPrice= adminDiscount.Price + (price * listerDiscount.Price) / 100;
        }
        discount = {
          couponType: "flat",
          Price: discountPrice,
          MinOrder: listerDiscount.MinOrder,
        };
      }
    }
    if (adminDiscount?.EndDate < new Date() || listerDiscount?.EndDate < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Discount expired.",
      });
    }
    if (price < adminDiscount?.MinOrder || price < listerDiscount?.MinOrder) {
      return res.status(401).json({
        success: false,
        message: "Minimum order value not reached.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Discount verified successfully",
      code: discount,
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
};

exports.getMydiscounts = async (req, res) => {
  try {
    const { id } = req.params
    const discounts = await discountSchema.find({ createdBy: id })
    if(!discounts) {
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
      discounts
    })
  } catch (error) {
    res.
    status(500)
    .json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}
