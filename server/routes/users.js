const express = require('express')
const { createUser, loginUser, listUsers } = require('../handlers/users')

const router = express.Router()

router.get('/', listUsers)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router
