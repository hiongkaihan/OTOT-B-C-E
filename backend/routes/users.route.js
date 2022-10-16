const express = require('express')
const router = express.Router()
const controller = require('../controllers/users.controller')
const { authenticateJwt, accessControl } = require('../middleware/auth')

router.route('/').get(authenticateJwt, accessControl(['admin']), controller.getUsers)
router.route('/data').get(controller.getData)
router.route('/:id').get(controller.getUserById)
router.route('/').post(controller.createUser)
router.route('/:id').delete(controller.deleteUser)
router.route('/:id').put(controller.updateUser)
router.route('/login').post(controller.login)

module.exports = router