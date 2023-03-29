const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { body } = require("express-validator");
const User = require("../../models/userModel");

exports.signupValidator = [
  body("userName").optional().isString().withMessage("UserName must be string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Enter a valid email").custom(async val =>{
        const user = await User.findOne({where: {email: val}})
        if(user){
            throw new Error('This email already used please use another email')
        }
        return true
    }),
  body("password").notEmpty().withMessage("Password is required"),
  body('role').optional(),
  validatorMiddleware
];

