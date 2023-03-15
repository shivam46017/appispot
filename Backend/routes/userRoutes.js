const { userLogin, createUser } = require("../controller/userController");

let router = require("express").Router();


router.post("/user-login", userLogin);
router.post("/user-signup", createUser);
module.exports = router;