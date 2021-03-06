const http = require('http')
const path = require('path')
const fs = require('fs')

const port = process.env.PORT || 8000

function verifyUrl(url) {
  const verification = url === '/' || !isFileRequest(url)
  const indexPath = path.join('index.html')

  return verification ? indexPath : url
}

function isFileRequest(url) {
  const regexs = [/\.([a-z]){1,4}/]
  return regexs.every(regex => RegExp(regex).test(url))
}

async function getFileContent(path) {
  try {
    const result = await readFileContent(path)

    return await result
  } catch(err) {
    console.error('index-server Error:', err)
  }
}

function readFileContent(path) {
  return new Promise((resolve, reject) => {
    if(fs.existsSync(path)) {
      resolve(fs.readFileSync(path))
    }
    reject(`File ${path} not found`)
  })
}

function notFound(res) {
  res.writeHead(400)
  res.end()
}

const server = http.createServer(async (req, res) => {
  if(req.url === '/index.js') notFound(res)

  const fileName = verifyUrl(req.url)
  const extension = fileName.split('.')[1]
  const filePath = path.join(__dirname, fileName)
  
  const mimeTypes = {
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    xml: 'application/xml',
    ts: 'application/typescript',
    json: 'application/json',
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    otf: 'font/otf',
    ttf: 'font/ttf'
  }

  const contentType = mimeTypes[extension] || 'application/octet-stream'

  const fileContent = await getFileContent(filePath)

  if(fileContent) {
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(fileContent)
  }

  notFound(res)
})

server.listen(port)