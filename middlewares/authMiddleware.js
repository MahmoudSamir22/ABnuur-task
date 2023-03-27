const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

// @desc Check If user logged in
// @route Middleware
exports.auth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  if (!token) {
    return next(
      new ApiError(`UnAuthorized User, please login with valid Account `, 401)
    );
  }
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decoded.userId);
  if (!user) {
    return next(
      new ApiError("The user that belong to this token no longer exist", 401)
    );
  }
  const loggedInUser = {
    id: user.id,
    role: user.role,
  };
  req.user = loggedInUser;
  next();
});

// @desc Make routes secure for spesific role
// @route Middleware
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("This user not allowed to use this route", 403));
    }
    next();
  });
