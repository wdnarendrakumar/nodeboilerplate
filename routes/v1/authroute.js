const { login, register, logout, reset, forgetPassword } = require('../../controller/auth.controller')
const { registers, logins, logouts, forgetPasswords, resetPasswords } = require('../../validation/auth.validation')
let route = require('express').Router()
let validate = require('../../middleware/validator')
let comment = require('../../model/Comment')
let task = require('../../model/Task')
let User = require('../../model/UserTaskModel')
route.post('/register', validate(registers), register)
route.post('/login', validate(logins), login)
route.post('/logout', validate(logouts), logout)
route.post('/forgetPassword', validate(forgetPasswords), forgetPassword)
route.post('/resetPassword/:resetToken', validate(resetPasswords), reset)
// route.post('/:taskid/removecomment', async (req, res, next) => {
//     let taskid = req.params.taskid
//     let comments = req.body.commentIds
//     await task.findOneAndUpdate({ _id: taskid }, { $pullAll: { comments_in_task: comments } })
//     for (let i = 0; i < comments.length; i++) {
//         await comment.findOneAndUpdate({ _id: comments[i] }, { $set: { isdeleted: true } })
//     }
//     res.status(200).send('done')
// })
// route.get('/listAllUser', async (req, res, next) => {
//     const { role, fname, lname, fromDate, toDate, status } = req.query
//     // let { fname, lname } = name
//     // req.query.status='ACTIVE'
//     let payload = {}
//     if (fname)
//         payload.first_name = { $regex: fname, $options: 'i' }
//     if (status)
//         payload.status = status
//     if (lname)
//         payload.last_name = { $regex: lname, $options: 'i' }
//     if (fromDate)
//         payload.createdAt = { $gte: new Date(fromDate) }
//     if (toDate)
//         payload.createdAt = { $lt: new Date(toDate) }
//     if (fromDate && toDate)
//         payload.createdAt = { $gte: new Date(fromDate), $lt: new Date(toDate) }
//     if (role)
//         payload.role = req.query.role

//     // res.json({ response: false })
//     console.log(payload)
//     const datas = await User.find(payload).skip((req.query.page - 1) * 3).limit(3)
//     res.json({ data: datas, page: req.query.page, limit:3,totalPage:(await User.find(payload)).length/3})
// })

module.exports = route      