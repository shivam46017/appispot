const {  adminLogin, createAdmin } = require("../controller/adminController");
let router = require("express").Router();


router.post("/admin-login", adminLogin);
router.post("/admin-signup", createAdmin);
module.exports = router;