const http = require("http")
const urlNode = require('url');
const { routes } = require("./app")
const defaultFtn = require("./modules/default/functions")
const { timing } = require("./core/interceptors/timing")


function showRoutesAvailables() {
    routes.forEach(route => {
        console.log(`Mapped [${route.method.toUpperCase()}] ${route.path}`)
    })
}


const server = http.createServer((request, response) => {
    try {
        const url = urlNode.parse(request.url, true);
        const method = request.method.toLowerCase()
        const route = routes.find((el) => el.path === url.pathname && el.method === method)

        route ? timing(request, response, route.task) : defaultFtn.ApiDefault(request, response)

    } catch (error) {
        console.log("An error has ocurred")
        console.error(error)
        response.writeHead(500, { "content-type": "text/plain" })
        response.end("An error has ocurred")
    }


    /*     if (url.pathname === "/api" && method === "get") {
            Api(request, response)
        } else if (url.pathname === "/api/users" && method === "get") {
            ApiUsers(request, response)
        } else if (url.pathname === "/api/test" && method === "get") {
            ApiTest(request, response)
        } else if (url.pathname === "/api/courses" && method === "get") {
            ApiCourses(request, response)
        } else if (url.pathname === "/api/courses/details" && method === "get") {
            ApiCourseDetails(request, response)
        } else if (url.pathname === "/api/pdf" && method === "get") {
            ApiPdfV1(request, response)
        } else if (url.pathname === "/api/pdf" && method === "post") {
            ApiPdfV2(request, response)
        } else {
            ApiDefault(request, response)
        } */

})

server
    .listen(3000, "127.0.0.1")
    .on("listening", () => {
        console.log(`Server is running on port 3000`);
        console.log(`Metrics monitoring started - Available endpoints:`);
        console.log(`  GET /api/metrics - Complete metrics with alerts`);
        console.log(`  GET /api/metrics/simple - Simple metrics format`);
        showRoutesAvailables();
    })
    .on("error", error => console.error(error))

