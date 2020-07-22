const React = require('react')
const ReactDOMServer = require('react-dom/server')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const routes = require('./routes')
const App = require('../client/src/components/App')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const renderApp = (req, res) => {
  const appHtml = ReactDOMServer.renderToString(<App />)
  const indexFile = path.join(__dirname, '..', 'dist', 'index.html')

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err)
      return res.status(500).send('Error reading index.html')
    }
    const document = data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    return res.send(document)
  })
}

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use('/api', routes)
app.use('/', renderApp)

app.listen(port, () => console.log(`Server listening on port ${port}`))
