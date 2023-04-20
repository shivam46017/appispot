const {  adminLogin, createAdmin, updateCategories, updateAmenities } = require("../controller/adminController");
let router = require("express").Router();


router.post("/admin-login", adminLogin);
router.post("/admin-signup", createAdmin);
router.post("/update-category", updateCategories);
router.post("/update-amenities", updateAmenities);

module.exports = router;