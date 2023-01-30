const Joi = require('joi')

const registers = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required()
})
const logins = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
})
const logouts = Joi.object().keys({
    refreshToken: Joi.string().required().min(20)
})
const forgetPasswords = Joi.object().keys({
    email: Joi.string().required().email()
})
const resetPasswords = Joi.object().keys({
    newpassword: Joi.string().required()
})
module.exports = {
    registers,
    logins,
    logouts,
    forgetPasswords,
    resetPasswords
}