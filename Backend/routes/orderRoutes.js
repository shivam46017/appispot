const router = require("express").Router();

const { bookSpot } = require("../controller/orderController");

router.post("/book-spot", bookSpot);

module.exports = router;