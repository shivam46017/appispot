const { userLogin, createUser, allUsers,updateUser } = require("../controller/userController");

let router = require("express").Router();


router.post("/seller-login", userLogin);
router.post("/seller-signup", createUser);

router.put("/seller-update/:id", updateUser);
router.get("/getAllSellers", allUsers);
module.exports = router;