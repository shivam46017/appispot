const { sendMailVerification, verfiyEmail } = require("../controller/mail");
const { userLogin, createUser, allUsers,updateUser, getNotifications, getOtp, verifyOtp, isEmailVerified, requestEmailVerification, requestPasswordChangeOnForgotPassword, requestForgotPasswordEmail, putProfilePicture } = require("../controller/userController");

let router = require("express").Router();


router.post("/user-login", userLogin);
router.post("/user-signup", createUser);

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp)

router.put("/user-update/:id", updateUser);
router.get("/getAllUsers", allUsers);
router.get("/getNotifications", getNotifications)

router.post("/user/get-email-verification/:id", sendMailVerification)
router.get("/user/verify-email", verfiyEmail)
router.post('user/email-verified/:id', isEmailVerified)
router.post("/user/forgot-password", requestForgotPasswordEmail)
router.post('/user/reset-password', requestPasswordChangeOnForgotPassword)


router
.post('/user/profile-picture/:userId', putProfilePicture)

module.exports = router;