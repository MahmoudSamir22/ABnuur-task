const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const ApiError = require('../utils/apiError')
const User = require('../models/userModel')

exports.signUp = asyncHandler(async (req, res, next)=> {
    const user = await User.create(req.body)
    const token = generateToken(user.id)
    res.status(201).json({data:user, token})
})

exports.login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({where: {email: req.body.email}})
    if(!user || !(await bcrypt.compare(req.body.password, user.password))){
        return next(new ApiError(`Incorrect email or password`, 401))
    }
    const token = generateToken(user.id)
    res.status(200).json({data:user, token})
})