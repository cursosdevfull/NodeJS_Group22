const root = require("./functions")

const routes = [
    {
        path: "/api",
        method: "get",
        task: root.Api
    },
]

module.exports = { routes }