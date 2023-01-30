let route = require('express').Router()
let {
    deleteUser,
    updateUser,
    getUser,
    getUsers
} = require('../../validation/user.validation')
let { userController } = require('../../controller')
let validate = require('../../middleware/validator')
let { auth } = require('../../middleware/authrization')
let { joimiddleware } = require('../../middleware/joimiddleware')
route
    .route('/')
    .get(auth, (req, res, next) => {
        req.body = req.query
        next()
    }, validate(getUsers), userController.getUsers);

route
    .route('/:userId')
    .get(auth, joimiddleware, validate(getUser), userController.getUser)
    .patch(auth, joimiddleware, validate(updateUser), userController.updateUser)
    .delete(auth, joimiddleware, validate(deleteUser), userController.deleteUser);



module.exports = route