const {  adminLogin, createAdmin, updateCategories,getAllAmenities, updateAmenities, deleteCategory, deleteAmenities, getOrders, getReviews, getAllCategory, updateSpot, deleteSpot, getAllSpot, taxController, getAllCitiesRegistered, taxInfo, getAllChatsParticipants, getAllChats } = require("../controller/adminController");
const { getAllcancellations, addNewCancellation, getCancellationById, updateCancellation, deleteCancellation } = require('../controller/cancellationController')
const Tax = require("../schema/taxSchema");
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

// spot
router
.get("/spots", getAllSpot)
.put("/spot/:id", updateSpot) // update
.delete("/spot/:id", deleteSpot)

router
.get('/tax', taxInfo)
.post('/tax', taxController)

router.get('/cities', getAllCitiesRegistered)

// cancellation
router.get('/cancellations', getAllcancellations)
router.get('/cancellations/:id', getCancellationById)
router.post('/cancellations', addNewCancellation)
router.put('/cancellations/:id', updateCancellation)
router.delete('/cancellations/:id', deleteCancellation)

router.get('/all-chat-participants', getAllChatsParticipants)
router.get('/all-chats', getAllChats)

module.exports = router;