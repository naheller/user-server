const validateSession = (req, res, next) => {
  console.log('Validating session:', req.session)
  console.log('All sessions', req.sessionStore.sessions)

  if (!req.session.username) {
    req.session.destroy((err) => {
      // TODO: Remove server session if no longer valid
      if (err) {
        console.log('Error destroying session:', err)
      }
      res.clearCookie('user_sid')
      res.status(401).send({ error: 'Missing or invalid session' })
    })
  } else {
    next()
  }
}

module.exports = validateSession
