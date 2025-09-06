const fs = require("fs")
const path = require("path")

function ApiPdfV1(_, response) {
    const file = path.join(__dirname, "../../../", "assets/pdfs/guia.pdf")

    fs.readFile(file, (err, content) => {
        if (!err) {
            response.writeHead(200, { "content-type": "application/pdf" })
            response.write(content)
            response.end()
        } else {
            console.log(err)
            response.writeHead(500, { "content-type": "text/plain" })
            response.end("An error has ocurred")
        }
    })
}

function ApiPdfV2(_, response) {
    const file = path.join(__dirname, "../../../", "assets/pdfs/guia.pdf")

    response.writeHead(200, { "content-type": "application/pdf" })

    try {
        const readStream = fs.createReadStream(file)
        readStream.pipe(response)
    } catch (error) {
        console.log(error)
        response.writeHead(500, { "content-type": "text/plain" })
        response.end("An error has ocurred")
    }
}

module.exports = { ApiPdfV1, ApiPdfV2 }