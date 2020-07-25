const express = require('express')
const { createUser, loginUser, listUsers } = require('../handlers/users')
const validateSession = require('../middleware/validateSession')

const router = express.Router()

router.get('/', validateSession, listUsers)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router
