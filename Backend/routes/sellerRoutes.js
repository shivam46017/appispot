const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getAmenitiesAndCategories } = require("../controller/sellerController");

let router = require("express").Router();


router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("/getAllspotbySellerID/:sellerid", createSpot);

router.put("/postspotbySellerID/", createSpot);

module.exports = router;