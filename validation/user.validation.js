const Joi = require('joi')

const getUsers = Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string().required(),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
})

const getUser = Joi.object().keys({
    userId: Joi.string()
})

const updateUser = Joi.object().keys({
    userId: Joi.required(),
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string(),
})


const deleteUser = Joi.object().keys({
    userId: Joi.string()
})

module.exports = {
    deleteUser,
    updateUser,
    getUser,
    getUsers,
}