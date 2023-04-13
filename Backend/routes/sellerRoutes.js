const { SellerLogin, createSeller, updateSeller, allSeller, createSpot } = require("../controller/sellerController");

let router = require("express").Router();


router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("/getAllspotbySellerID/:sellerid", createSpot);

router.put("/postspotbySellerID/", createSpot);

module.exports = router;