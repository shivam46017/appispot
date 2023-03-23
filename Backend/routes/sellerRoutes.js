const { SellerLogin, createSeller, updateSeller, allSeller } = require("../controller/sellerController");

let router = require("express").Router();


router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);
module.exports = router;