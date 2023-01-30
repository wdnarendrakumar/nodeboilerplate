let ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
let UserModel = require('../model/UserModel')
let TokenModel = require('../model/TokenModel')
let jwt = require('jsonwebtoken')
// let { verifyToken } = require('./tokenService')
let verifyToken = async (token, type) => {
    const paylaod = jwt.verify(token, process.env.JWT_SECRET)
    const tokendoc = await TokenModel.findOne({ token: token, type: type, user: paylaod.sub, blacklisted: false })
    if (!tokendoc) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'token is not correct')
    }
    return tokendoc
}
let findById = async ({ id }) => {
    return await UserModel.findById(id)
}
module.exports = {
    create: async (body) => {
        const user = await UserModel.findOne({ email: body.email })
        if (!!user)
            throw new ApiError(httpStatus.BAD_REQUEST, "email already exists")
        else {
            return await UserModel({ name: body.name, email: body.email, password: body.password }).save()
        }
    },
    findByEmailAndPassword: async ({ email, password }) => {
        return await UserModel.findOne({ email: email, password: password })
    },
    logout: async ({ refreshToken }) => {
        const refreshtoken = await TokenModel.findOne({ token: refreshToken, type: 'refresh', blacklisted: false })
        if (!refreshtoken)
            throw new ApiError(httpStatus.BAD_REQUEST, 'not found refreshToken')
        await refreshtoken.remove()
    },
    findByEmail: async ({ email }) => {
        return await UserModel.findOne({ email: email })
    },
    resetPassword: async ({ resetToken, newpassword }) => {
        try {
            const doc = await verifyToken(resetToken, 'reset')
            const user = await findById({ id: doc.user })
            if (!user) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found')
            }
            await UserModel.updateOne({ _id: user.id }, { $set: { password: newpassword } })
            await TokenModel.deleteMany({ user: user.id, type: 'reset' })
        }
        catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
        }
    },
    findById: findById,
    findWithFilter: async ({ limit, page, name, role, sortBy }) => {
        let payload = {}
        if (name) {
            payload.name = name
        }
        if (role) {
            payload.role = role
        }
        const data = await UserModel.find(payload).skip((page - 1) * limit).limit(limit).sort({ name: sortBy })
        const totalDocs = await UserModel.find(payload).countDocuments()
        return { userData: data, totalDocs: totalDocs, page: page, totalPage: Math.ceil(totalDocs / limit) }
    },
    find: async () => {
        return await UserModel.find()
    },
    updateOne: async (id, updateBody) => {
        const user = await findById({id:id})
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'user not exist')
        }
        Object.assign(user, updateBody)
        await user.save()
        return user
    },
    deleteOne:async(id)=>{
        const user = await findById({id:id})
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,'user not Exist')
        }
        await user.remove()
        return user
    }
}