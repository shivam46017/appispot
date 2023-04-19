const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getSpot, getAllSpot } = require("../controller/sellerController");

let router = require("express").Router();


router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("/getspots/:sellerid/:page", getSpot);
router.get("/getallspots/:page", getAllSpot);

router.put("/createspot/:sellerid", createSpot);

module.exports = router;