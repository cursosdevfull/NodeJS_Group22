const routesCourses = require("./modules/courses/routes")
const routesPdfs = require("./modules/pdfs/routes")
const routesRoot = require("./modules/root/routes")
const routesUsers = require("./modules/users/routes")


const routes = [
    ...routesCourses.routes,
    ...routesPdfs.routes,
    ...routesRoot.routes,
    ...routesUsers.routes,
]

module.exports = { routes }