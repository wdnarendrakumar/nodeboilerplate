const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')


const validate = (schema) => (req, res, next) => {
    try {
        const { error } = schema.validate(req.body)
        if (error)
            next(error)
        else
            next()
    }
    catch (err) {
        // console.log(err)
        next(new ApiError(httpStatus.NOT_ACCEPTABLE, 'some error in validation'))
    }
}
module.exports = validate;