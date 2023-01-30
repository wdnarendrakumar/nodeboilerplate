const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
let ApiError = require('../utils/ApiError')
let { create, findByEmailAndPassword, logout, resetPassword } = require('../services/userServices')
let { generateAuthTokens, generateResetToken } = require('../services/tokenService')
const { sendResetPasswordEmail } = require('../utils/emailService')
module.exports = {
    register: catchAsync(async (req, res) => {
        // throw new ApiError(403,"this is error in catchAsync")
        const user = await create(req.body)
        const token = await generateAuthTokens(user)
        res.status(httpStatus.CREATED).send(JSON.stringify(token))
    }),
    login: catchAsync(async (req, res) => {
        const user = await findByEmailAndPassword({ email: req.body.email, password: req.body.password })
        if (!!!user)
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Credential')
        const token = await generateAuthTokens(user)
        res.status(httpStatus.ACCEPTED).send(JSON.stringify(token))
    }),
    logout: catchAsync(async (req, res) => {
        await logout({ refreshToken: req.body.refreshToken })
        res.status(httpStatus.NO_CONTENT).send()
    }),
    reset: catchAsync(async (req, res) => {
        await resetPassword({ resetToken: req.params.resetToken, newpassword: req.body.newpassword })
        res.status(httpStatus.ACCEPTED).send('done')
    }),
    forgetPassword: catchAsync(async (req, res) => {
        const token = await generateResetToken({ email: req.body.email })
        await sendResetPasswordEmail('wdnarendrakumar+sadlf@gmail.com', token.token)
        res.status(httpStatus.ACCEPTED).send('email sent')
    })
}  