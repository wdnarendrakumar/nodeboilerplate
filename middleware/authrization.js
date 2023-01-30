const httpStatus = require('http-status')
let jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')
let User = require('../model/UserModel')
exports.auth = async (req, res, next) => {
    let _ = req.headers.authorization.split(' ')[1]
    try {
        const user = jwt.verify(_, process.env.JWT_SECRET)
        const isAdmin = await User.findById(user.sub)
        if (isAdmin.role === 'Admin')
            next()
        else {
            if (!(user.sub === req.params.userId))
                throw new ApiError(httpStatus.UNAUTHORIZED, 'userid and token is not from same person')
            next()
        }
    } catch (error) {
        if (error instanceof ApiError)
            next(error)
        else
            next(new ApiError(httpStatus.UNAUTHORIZED, 'unauthorize user'))
    }
}