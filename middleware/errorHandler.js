let logger = require('../config/logger')
module.exports = (err, req, res, next) => {
    let { statuscode, message, stack } = err
    message = message.replace(/\"/g, '')
    logger.error(`${statuscode || 500} - ${res.statusMessage} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (process.env.NODEENV === 'developement')
        res.status(statuscode).send(JSON.stringify({ statuscode: statuscode, message: message, stack: stack }))
    else
        res.status(statuscode).send(JSON.stringify({ statuscode: statuscode, message: message }))
}