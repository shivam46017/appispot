const { userLogin, createUser, allUsers,updateUser } = require("../controller/userController");

let router = require("express").Router();


router.post("/user-login", userLogin);
router.post("/user-signup", createUser);

router.put("/user-update/:id", updateUser);
router.get("/getAllUsers", allUsers);
module.exports = router;