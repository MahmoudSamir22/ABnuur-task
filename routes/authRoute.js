const router = require("express").Router();

const { signUp, login, resendVerifyCode, verifyEmail } = require("../controllers/authController");

const {signupValidator} = require('../utils/validators/authValidator')

router.post("/signUp", signupValidator, signUp);

router.post("/login", login);

router.post("/resendVerifyCode", resendVerifyCode);

router.post("/verifyEmail", verifyEmail);


module.exports = router;
