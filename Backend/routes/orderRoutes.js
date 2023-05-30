const router = require("express").Router();

const { bookSpot, reviewSpot, getBookings, getMostBooked10Spots, getMostBookedListers, getMyUserBookings } = require("../controller/orderController");

router.post("/book-spot", bookSpot);
router.post("/review-spot", reviewSpot)
router.get("/get-all-orders", getBookings)
router.get("/get-my-users-orders/:userId", getMyUserBookings) 
router.get("/get-most-booked-spots", getMostBooked10Spots)
router.get("/get-most-booked-listers", getMostBookedListers)

module.exports = router;