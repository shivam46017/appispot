const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getSpot, getAllSpot, getAmenitiesAndCategories, getSpotID, getMyBookings, getAllAmenities, getAllCategory, isEmailVerified, requestForgotPasswordEmail, requestEmailVerification, requestPasswordChangeOnForgotPassword } = require("../controller/sellerController");
const { sendMailVerification, verfiyEmail } = require("../controller/mail");

// const multer = require('multer');
let router = require("express").Router();
// const path = require("path");
// const fs = require("fs");


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const sellerId = req.params.sellerid;
//       const basePath = path.join(__dirname, "../uploads", "spotImages", sellerId);
//       if (!fs.existsSync(basePath)) {
//         fs.mkdirSync(basePath, { recursive: true });
//       }/lister
//       cb(null, basePath);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   // Set up multer with the storage configuration
//   const upload = multer({ storage: storage });

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

router.post("/lister/get-email-verification/:id", sendMailVerification)
router.get("/lister/verify-email", verfiyEmail)
router.post('/lister/email-verified/:id', isEmailVerified)
router.post("/lister/forgot-password", requestForgotPasswordEmail)
router.post('/lister/reset-password', requestPasswordChangeOnForgotPassword)

module.exports = router;