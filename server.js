const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { addUser, getUserByName, getAllUsers } = require('./dynamo')

const app = express()
const port = 3000
const saltRounds = 10

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/user', (req, res) => {
  const { name, password } = req.body

  if (!name) return res.status(400).send({ error: 'Name required' })
  if (!password) return res.status(400).send({ error: 'Password required' })

  bcrypt.hash(password, saltRounds, (err, passwordHash) => {
    if (err) {
      res.status(500).send()
    } else {
      addUser(name, passwordHash)
        .then((data) => res.send(data))
        .catch((err) => {
          const statusCode = parseInt(err.statusCode || 500)
          res.status(statusCode).send({ error: err.message || 'Server error' })
        })
    }
  })
})

app.get('/users', (req, res) => {
  getAllUsers()
    .then((data) => {
      data.Items.forEach((item) => {
        delete item.password
      })
      res.send(data.Items)
    })
    .catch((err) => {
      const statusCode = parseInt(err.statusCode || 500)
      res.status(statusCode).send({ error: err.message || 'Server error' })
    })
})

app.post('/login', (req, res) => {
  const { name, password } = req.body

  if (!name) return res.status(400).send({ error: 'Name required' })
  if (!password) return res.status(400).send({ error: 'Password required' })

  getUserByName(name)
    .then((data) => {
      if (data.Item) {
        bcrypt.compare(password, data.Item.password, (err, result) => {
          if (err || result != true) {
            res.status(401).send({ error: err || 'Password invalid' })
          } else {
            delete data.Item.password
            res.send(data)
          }
        })
      } else {
        res.status(404).send({ error: 'User not found' })
      }
    })
    .catch((err) => {
      const statusCode = parseInt(err.statusCode || 500)
      res.status(statusCode).send({ error: err.message || 'Server error' })
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
