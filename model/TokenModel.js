let mongoose = require('mongoose')

let TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['refresh', 'reset', 'verfiyemail'],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Token', TokenSchema)