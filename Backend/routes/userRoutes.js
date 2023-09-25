const { sendMailVerification, verfiyEmail } = require("../controller/mail");
const { userLogin, createUser, allUsers,updateUser, getNotifications, getOtp, verifyOtp, isEmailVerified, requestEmailVerification } = require("../controller/userController");

let router = require("express").Router();


router.post("/user-login", userLogin);
router.post("/user-signup", createUser);

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp)

router.put("/user-update/:id", updateUser);
router.get("/getAllUsers", allUsers);
router.get("/getNotifications", getNotifications)

router.post("/get-email-verification/:id", sendMailVerification)
router.get("/verify-email/:token", verfiyEmail)
router.post('email-verified/:id', isEmailVerified)


module.exports = router;