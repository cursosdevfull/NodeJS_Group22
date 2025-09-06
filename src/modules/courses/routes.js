const courses = require("./functions")

const routes = [
    {
        path: "/api/courses",
        method: "get",
        task: courses.ApiCourses
    },
    {
        path: "/api/courses/details",
        method: "get",
        task: courses.ApiCourseDetails
    },
]

module.exports = { routes }