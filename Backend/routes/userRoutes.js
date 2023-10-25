const { verifyEmail } = require("../controller/mail");
const { userLogin, createUser, allUsers,updateUser, getNotifications, getOtp, verifyOtp, isEmailVerified, requestEmailVerification, requestPasswordChangeOnForgotPassword, requestForgotPasswordEmail, putProfilePicture, sendMailVerification, getMyBookedSpots } = require("../controller/userController");

let router = require("express").Router();


router.post("/user-login", userLogin);
router.post("/user-signup", createUser);

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp)

router.put("/user-update/:id", updateUser);
router.get("/getAllUsers", allUsers);
router.get("/getNotifications", getNotifications)

router.post("/user/get-email-verification", sendMailVerification)
router.post('user/email-verified/:id', isEmailVerified)
router.post("/user/forgot-password", requestForgotPasswordEmail)
router.post('/user/reset-password', requestPasswordChangeOnForgotPassword)

router.get('/user/my-booked-spots/:id', getMyBookedSpots)

router
.post('/user/profile-picture/:userId', putProfilePicture)

module.exports = router;