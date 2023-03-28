const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const VerifyCodes = require("../models/verifyCodesModel");

// @desc Signup new user
// @route POST /api/auth/signup
// @access All
exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = generateToken(user.id);
  const codes = generateOTP();
  const emailOptions = {
    email: user.email,
    subject: "Email Verify Code",
    message: `Your Email Verify Code is ${codes.otp}. \n This code is valid for 10 Mins. Please don't share this code with any one`,
  };
  await sendEmail(emailOptions);
  await VerifyCodes.create({
    emailVerifyCode: codes.hashedOTP,
    emailVerifyCodeExpiration: codes.otpExpiration,
    user_id: user.id,
  });
  res.status(201).json({ data: user, token });
});
// @desc Login existed user and generate login token
// @route POST /api/auth/login
// @access All
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError(`Incorrect email or password`, 401));
  }
  const token = generateToken(user.id);
  res.status(200).json({ data: user, token });
});
// @desc Resend verification code to the email
// @route POST /api/auth/resendVerifyCode
// @access All
exports.resendVerifyCode = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new ApiError(`No user found with this email: ${req.body.email}`, 404)
    );
  }

  const codes = generateOTP();
  const emailOptions = {
    email: user.email,
    subject: "Email Verify Code",
    message: `Your Email Verify Code is ${codes.otp}. \n This code is valid for 10 Mins. Please don't share this code with any one`,
  };
  await sendEmail(emailOptions);
  const userVerify = await VerifyCodes.findOne({ where: { user_id: user.id } });
  if (userVerify) {
    userVerify.emailVerifyCode = codes.hashedOTP;
    userVerify.emailVerifyCodeExpiration = codes.otpExpiration;
    await userVerify.save();
  } else {
    await VerifyCodes.create({
      emailVerifyCode: codes.hashedOTP,
      emailVerifyCodeExpiration: codes.otpExpiration,
      user_id: user.id,
    });
  }
  res.status(200).json("Code sent successfuly to Email");
});
// @desc Verify user email 
// @route POST /api/auth/verifyEmail
// @access All
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    include: VerifyCodes,
  });
  const hashedOTP = crypto
    .createHash(process.env.HASHING_METHOD)
    .update(req.body.verifyCode.toString())
    .digest("hex");

  if (
    hashedOTP != user.verify_code.emailVerifyCode ||
    Date.now() > user.verify_code.emailVerifyCodeExpiration
  ) {
    return next(new ApiError('Verify code is wronge or expired', 400))
  }
  user.isEmailVerified = true;
  await user.save()
  res.status(200).json('Email Verified successfully')
});
