const mongoose = require('mongoose')
const uri = process.env.NODE_ENV === 'test' 
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

const connection = async () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log("Database connection succeeded!")
    })

    mongoose.connection.on("Error", (err) => {
        console.log(err)
        throw new Error("Database connection failed.")
    })

    return mongoose
}

module.exports = { connection, mongoose }