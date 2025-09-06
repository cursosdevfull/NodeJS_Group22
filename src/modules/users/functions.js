function ApiUsers(request, response) {
    const users = ["Carla", "Pilar", "Jorge", "Luis"]
    response.writeHead(200, { "content-type": "text/plain" })
    //response.write(`Response from server: ${url}\n`)
    response.write(JSON.stringify(users))
    //response.write(`At ${(new Date()).toISOString()}`)
    response.end()
}

module.exports = { ApiUsers }