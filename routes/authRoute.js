const router = require("express").Router();

const { signUp, login } = require("../controllers/authController");

router.post("/signUp", signUp);

router.post("/login", login);


module.exports = router;
