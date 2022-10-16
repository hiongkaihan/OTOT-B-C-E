const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config()
const db = require('./db/connect')
const users = require('./routes/users.route')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        status: "ok"
    })
})

app.use('/api/users', users)

try {
    db.connection()
    db.seedDatabase()
} catch (e) {
    console.error(e)
}

module.exports = app