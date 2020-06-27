const { scanTable, addUser, getUserByEmail } = require('./dataMethods')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/list', (req, res) => {
  scanTable()
    .then((data) => res.send(data.Items))
    .catch((err) => {
      const statusCode = parseInt(err.statusCode || 500)
      res.status(statusCode).send({ error: err.message || 'Server error' })
    })
})

app.post('/user', (req, res) => {
  const { email, password } = req.body

  if (!email) return res.status(400).send({ error: 'Email required' })
  if (!password) return res.status(400).send({ error: 'Password required' })

  addUser(email, password)
    .then((data) => res.send(data))
    .catch((err) => {
      const statusCode = parseInt(err.statusCode || 500)
      res.status(statusCode).send({ error: err.message || 'Server error' })
    })
})

app.get('/user', (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).send({ error: 'Email required' })

  getUserByEmail(email)
    .then((data) => res.send(data))
    .catch((err) => {
      const statusCode = parseInt(err.statusCode || 500)
      res.status(statusCode).send({ error: err.message || 'Server error' })
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
