let mongoose = require('mongoose')
mongoose.set('strictQuery', true)
let url = 'mongodb://127.0.0.1:27017/boilerplate'
mongoose.connect(url, () => {
    console.log('connected')
})

module.exports = mongoose.connection
