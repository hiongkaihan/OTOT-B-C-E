const jwt = require('jsonwebtoken')
const usersService = require('../services/users.service')
const mongoose = require('mongoose')
require('../models/userDetails.model')
const userDetails = mongoose.model('UserDetail')
const redis = require("redis")
let redisClient

(async () => {
  redisClient = redis.createClient(6379)

  redisClient.on("error", (error) => console.error(`Error : ${error}`))

  await redisClient.connect()
})()

module.exports.createUser = (req, res) => {
    const { name, email, role } = req.body

    if (!name || !email) return res.status(400).json({message: "Missing name or email"})

    usersService.createUser(name, email, role).then((response) => {
        return res.status(201).json(response)
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({ status: false, err })
    })
}

module.exports.getUserById = (req, res) => {
    const { id } = req.params

    usersService
        .getUserById(id)
        .then((response) => {
            return res.status(200).json(response)
    }).catch((err) => {
        return res.status(500).json({ err })
    })
}

module.exports.getUsers = (req, res) => {
    usersService
        .getUsers()
        .then((response) => {
            return res.status(200).json(response)
    }).catch((err) => {
        return res.status(500).json({ err })
    })
}

module.exports.deleteUser = (req, res) => {
    const { id } = req.params
    usersService
        .deleteUser(id)
        .then(() => {
            return res.status(200).json({message: "User has been deleted"})
    }).catch((err) => {
        return res.status(500).json({ status: false, err })
    })
}

module.exports.updateUser = (req, res) => {
    const { id } = req.params
    const { name, email, role} = req.body

    if (!name || !email) return res.status(400).json({message: "Missing name or email"})
    
    usersService
        .updateUser(id, name, email, role)
        .then((response) => {
            return res.status(200).json({message: "User has been updated"})
    }).catch((err) => {
        return res.status(500).json({ status: false, err })
    })
}

module.exports.login = (req, res) => {
    const userToken = req.body
    try {
        token = jwt.sign(userToken, process.env.SECRET, {expiresIn: '1h'})
        return res.status(200).json(token)
    } catch(err) {
        return res.status(500).json({ err })
    }
}

module.exports.getData = async (req, res) => {
    const cacheResults = await redisClient.get('data');
    if (cacheResults) {
        return res.status(200).json(JSON.parse(cacheResults))
    } else {
        results = await userDetails.find({})
        console.log("Caching data")
        await redisClient.set('data', JSON.stringify(results));
        return res.status(200).json(results)
    }
}