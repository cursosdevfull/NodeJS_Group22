function ApiCourses(_, response) {
    const courses = [{ title: "NodeJS" }, { title: "AWS CDK" }, { title: "Microservices" }]
    response.writeHead(200, { "content-type": "application/json" })
    //response.write(`Response from server: ${url}\n`)
    response.write(JSON.stringify(courses))
    //response.write(`At ${(new Date()).toISOString()}`)
    response.end()
}

function ApiCourseDetails(_, response) {
    response.writeHead(200, { "content-type": "application/json" })

    const courseId = url.query.courseId
    const course = {
        courseId,
        title: "Angular",
        description: "Course Angular Ultimate"
    }
    response.end(JSON.stringify(course))
}

module.exports = { ApiCourses, ApiCourseDetails }