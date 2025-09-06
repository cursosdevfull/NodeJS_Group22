const user = {
    name: "John",
    lastName: "Doe"
}

export const routes = [
    { path: "/", method: "GET", handler: (req: any, res: any) => { res.send("Hello World!"); } },
    { path: "/user", method: "GET", handler: (req: any, res: any) => { res.send(`Hello, ${user.name} ${user.lastName}!`); } }
]

