const urlNode = require('url');

function ApiDefault(request, response) {
    const url = urlNode.parse(request.url, true);
    response.writeHead(200, { "content-type": "text/plain" })
    response.write(`Response from server: ${url}\n`)
    response.write(`At ${(new Date()).toISOString()}`)
    response.end()
}

module.exports = { ApiDefault }