const {  adminLogin, createAdmin, updateCategories,getAllAmenities, updateAmenities, deleteCategory, deleteAmenities, getOrders, getReviews, getAllCategory } = require("../controller/adminController");
let router = require("express").Router();


router.post("/admin-login", adminLogin);
router.post("/admin-signup", createAdmin);
router.get("/getCategories", getAllCategory);
router.get("/getAmenities", getAllAmenities);
router.post("/update-category", updateCategories);
router.post("/update-amenities", updateAmenities);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-amenities/:id', deleteAmenities);
router.get("/get-orders", getOrders)
router.get("/get-all-reviews", getReviews)

module.exports = router;