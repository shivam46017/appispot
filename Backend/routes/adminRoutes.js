const {  adminLogin } = require("../controller/adminController");
let router = require("express").Router();


router.post("/login-admin", adminLogin);

module.exports = router;