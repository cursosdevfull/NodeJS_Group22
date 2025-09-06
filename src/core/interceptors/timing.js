const timing = (request, response, ftn) => {
    const start = Date.now()
    response.on("finish", () => {
        const duration = Date.now() - start
        console.log(`Request to ${request.method} ${request.url} took ${duration}ms`)
    })

    ftn(request, response)
}

module.exports = { timing }