const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getSpot, getAllSpot, getAmenitiesAndCategories, getSpotID, getMyBookings, getAllAmenities, getAllCategory, isEmailVerified, requestForgotPasswordEmail, requestEmailVerification, requestPasswordChangeOnForgotPassword, sendMailVerification } = require("../controller/sellerController");
const { verifyEmail } = require("../controller/mail");

let router = require("express").Router();

router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("/getCategories", getAllCategory);
router.get("/getAmenities", getAllAmenities);

router.get("/getspots/:sellerid/:page", getSpot);
router.get("/getallspots", getAllSpot);
router.get("/getspot/:id", getSpotID);

router.get("/getMySpots/:sellerid", getSpot)
router.get("/getMyBookings/:sellerid", getMyBookings)

router.post("/createspot/:sellerid", createSpot);

router.post("/lister/get-email-verification", sendMailVerification)
router.post('/lister/email-verified/:id', isEmailVerified)
router.post("/lister/forgot-password", requestForgotPasswordEmail)
router.post('/lister/reset-password', requestPasswordChangeOnForgotPassword)

module.exports = router;