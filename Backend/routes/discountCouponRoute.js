const { createCoupon, deleteCoupon, verifyCoupon, createDiscount, deleteDiscount, discountVenues, getAllCouponDiscount, getMydiscounts} = require("../controller/discountNCouponController");

let router = require("express").Router();

router.post("/genratecoupon", createCoupon);
router.post("/verifycoupon", verifyCoupon);
router.delete("/deletecoupon/:id", deleteCoupon);


router.post("/genratediscount", createDiscount);
router.post("/discountvenue", discountVenues);
router.delete("/deletediscount/:id", deleteDiscount);
router.get("/discountcoupon", getAllCouponDiscount);
router.get('/discountcoupon/:id', getMydiscounts)

module.exports = router;