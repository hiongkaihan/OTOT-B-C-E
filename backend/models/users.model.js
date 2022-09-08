const mongoose = require('mongoose')
const uuid = require('uuid')
const { Schema } = mongoose

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        default: uuid.v4()
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)