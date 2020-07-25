const session = require('express-session')
const { v4: uuidv4 } = require('uuid')

const sessionHandler = session({
  secret: '343ji43j4n3jn4jk3n', // TODO: Replace with env variable
  name: 'user_sid',
  genid: () => uuidv4(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: 60 * 60 * 1000, // 1 hour
    maxAge: 10000,
    sameSite: true,
    httpOnly: true,
  },
})

module.exports = sessionHandler
