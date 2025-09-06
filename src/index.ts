
import { App } from "./app";
const userName = "June"
const userLastName = "Doe"

// Create an instance of the App class
const app = new App();

// Retrieve routes using the getRoutes method
const routes = app.getRoutes();

// Log the user greeting
console.log(`Hello, ${userName} ${userLastName}!`);

// Log the configured routes
console.log("Routes configured:", routes);