let express = require('express')

let app = express()
let passport = require('passport')
let httpStatus = require('http-status')

let ApiError = require('./utils/ApiError')
require('./config/db')
require('dotenv').config()
let route = require('./routes/v1')
let { jwtStrategy } = require('./config/passport')
let errorHandler = require('./middleware/errorHandler')
let errorConverter = require('./middleware/errorConverter')
const { authLimiter } = require('./middleware/rateLimiter')
app.use(express.json())
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use('/v1', authLimiter, route)
app.use((req, res, next) => {
    next(new ApiError(httpStatus.BAD_REQUEST, 'request url not found'))
})

app.use(errorConverter)
app.use(errorHandler)


app.listen(7000)

