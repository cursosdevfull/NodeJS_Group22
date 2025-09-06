const users = require("./functions")

const routes = [
    {
        path: "/api/users",
        method: "get",
        task: users.ApiUsers
    },
]

module.exports = { routes }