exports.joimiddleware = (req, res, next) => {
    req.body.userId = req.params.userId
    next()
}