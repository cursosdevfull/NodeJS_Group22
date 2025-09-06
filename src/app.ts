import { routes } from "./modules/routes";

export class App {
    getRoutes(): typeof routes {
        return routes;
    }
}