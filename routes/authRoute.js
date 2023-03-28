const router = require("express").Router();

const { signUp, login, resendVerifyCode, verifyEmail } = require("../controllers/authController");

router.post("/signUp", signUp);

router.post("/login", login);

router.post("/resendVerifyCode", resendVerifyCode);

router.post("/verifyEmail", verifyEmail);


module.exports = router;
