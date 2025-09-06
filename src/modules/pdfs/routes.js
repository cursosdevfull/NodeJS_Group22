const pdfs = require("./functions")

const routes = [
    {
        path: "/api/pdf",
        method: "get",
        task: pdfs.ApiPdfV1
    },
    {
        path: "/api/pdf",
        method: "post",
        task: pdfs.ApiPdfV2
    }
]

module.exports = { routes }