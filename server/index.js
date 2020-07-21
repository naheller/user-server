const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', routes)

app.listen(port, () => console.log(`Server listening on port ${port}`))
