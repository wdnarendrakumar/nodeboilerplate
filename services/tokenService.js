const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const TokenModel = require('../model/TokenModel')
const Token = require('../model/TokenModel')
const ApiError = require('../utils/ApiError')
const userServices = require('./userServices')
const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
    return jwt.sign({ sub: userId, iat: moment().unix(), exp: expires.unix(), type }, secret)
}
const generateResetToken = async ({ email }) => {
    const user = await userServices.findByEmail({ email: email })
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, 'email does not exist')
    const token = generateToken(user.id, moment().add(10, 'minutes'), 'reset', process.env.JWT_SECRET)
    return await saveToken(token, user._id, moment().add(10, 'days'), 'reset', false)
}
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokendocs = await Token.create({
        token: token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted
    })
    return tokendocs
}
module.exports = {
    generateResetToken: generateResetToken,
    generateAuthTokens: async (user) => {
        const accessTokenExpires = moment().add(10, 'minutes')
        const accessToken = generateToken(user.id, accessTokenExpires, 'access')
        const refreshTokenExpires = moment().add(1, 'days')
        const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh')
        await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh')
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}