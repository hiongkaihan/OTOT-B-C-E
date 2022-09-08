const mongoose = require('mongoose')
const helper = require ('../db/helper')
require('../models/users.model')
const model = mongoose.model('User')

module.exports.createUser = async (name, email) => {
    return new Promise((resolve, reject) => {
        helper.save(model, {
            name,
            email
        })
        .then((res) => {
            resolve(res)
        })
        .catch((e) => reject(e))
    })
}

module.exports.getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        helper.list(model, { 
            userId: id 
        })
        .then((res) => {
            resolve(res)
        })
        .catch((e) => reject(e))
    })
}

module.exports.getUsers = async () => {
    return new Promise((resolve, reject) => {
        helper.list(model, {})
        .then((res) => {
            resolve(res)
        })
        .catch((e) => reject(e))
    })
}

module.exports.deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        helper.deleteOne(model, { userId: id })
        .then((res) => {
            resolve(res)
        })
        .catch((e) => reject(e))
    })
}

module.exports.updateUser = async (id, name, email) => {
    return new Promise((resolve, reject) => {
        helper.update(model, { userId: id }, { name, email })
        .then((res) => {
            resolve(res)
        })
        .catch((e) => reject(e))
    })
}