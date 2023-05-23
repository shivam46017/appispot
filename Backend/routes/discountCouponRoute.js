const { createCoupon, deleteCoupon, verifyCoupon} = require("../controller/discountNCouponController");

let router = require("express").Router();

router.post("/genratecoupon", createCoupon);
router.post("/verifycoupon", verifyCoupon);
router.delete("/deletecoupon/:id", deleteCoupon);

module.exports = router;