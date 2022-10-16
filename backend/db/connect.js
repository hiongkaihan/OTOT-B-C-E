const mongoose = require('mongoose')
require('../models/userDetails.model')
const userDetails = mongoose.model('UserDetail')
const { data } = require('../db/mock-data.js')
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

const seedDatabase = async () => {
    try {
        const count = await userDetails.countDocuments({})
        if (count === 0) {
            console.log("Seeding database...")
            userDetails.insertMany(data)
                .then(() => {
                    console.log("Database seeded")
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("Database already seeded")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connection, mongoose, seedDatabase }