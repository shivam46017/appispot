const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getSpot, getAllSpot, getAmenitiesAndCategories, getSpotID, getMyBookings } = require("../controller/sellerController");

let router = require("express").Router();


router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("/getspots/:sellerid/:page", getSpot);
router.get("/getallspots", getAllSpot);
router.get("/getspot/:id", getSpotID);

router.get("/getMySpots/:sellerid", getSpot)
router.get("/getMyBookings/:sellerid", getMyBookings)


router.post("/createspot/:sellerid", createSpot);

module.exports = router;