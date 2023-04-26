const {  adminLogin, createAdmin, updateCategories, updateAmenities, deleteCategory, deleteAmenities } = require("../controller/adminController");
let router = require("express").Router();


router.post("/admin-login", adminLogin);
router.post("/admin-signup", createAdmin);
router.post("/update-category", updateCategories);
router.post("/update-amenities", updateAmenities);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-amenities/:id', deleteAmenities);

module.exports = router;