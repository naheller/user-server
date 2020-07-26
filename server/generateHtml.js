const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const path = require('path')
const fs = require('fs')

const App = require('../client/src/components/App')

const generateHtml = (req, res) => {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  )
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

module.exports = generateHtml
