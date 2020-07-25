const express = require('express')
const path = require('path')
const routes = require('./routes')
const generateHtml = require('./generateHtml')
const sessionHandler = require('./middleware/sessionHandler')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionHandler)

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.use('/api', routes)
app.use('/', generateHtml)

app.listen(port, () => console.log(`Server listening on port ${port}`))
