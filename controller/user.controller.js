const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
let ApiError = require('../utils/ApiError')
let { updateOne, deleteOne, findById, findByEmailAndPassword, logout, resetPassword, findWithFilter } = require('../services/userServices')
// let { generateAuthTokens, generateResetToken } = require('../services/tokenService')

module.exports = {
    deleteUser: catchAsync(async (req, res) => {
        res.json(await deleteOne(req.params.userId))
    }),
    updateUser: catchAsync(async (req, res) => {
        delete req.body.userId
        res.json(await updateOne(req.params.userId, req.body))
    }),
    getUser: catchAsync(async (req, res) => {
        const user = await findById({ id: req.params.userId })
        res.status(httpStatus.ACCEPTED).json(user)
    }),
    getUsers: catchAsync(async (req, res) => {
        let body = req.body
        let data = await findWithFilter(body)
        res.json(data)
    })
}  