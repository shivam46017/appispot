const { createCoupon, deleteCoupon, verifyCoupon, createDiscount, deleteDiscount, discountVenues} = require("../controller/discountNCouponController");

let router = require("express").Router();

router.post("/genratecoupon", createCoupon);
router.post("/verifycoupon", verifyCoupon);
router.delete("/deletecoupon/:id", deleteCoupon);


router.post("/genratediscount", createDiscount);
router.post("/discountvenue", discountVenues);
router.delete("/deletediscount/:id", deleteDiscount);



module.exports = router;