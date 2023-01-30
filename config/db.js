let mongoose = require('mongoose')
mongoose.set('strictQuery', true)
let url = 'mongodb://127.0.0.1:27017/boilerplate'
// let url = 'mongodb+srv://task_management_project:NYvDITjmrPvnIMzm@cluster0.gt6t6cy.mongodb.net/task_management'
mongoose.connect(url, () => {
    console.log('connected')
})

module.exports = mongoose.connection
