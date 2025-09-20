import { Router } from "express";

export function getRoutes(parentPath: string, router: Router) {
    for (const route of router.stack) {
        console.log(`[${route.route?.stack[0].method.toUpperCase()}]: ${parentPath}${route.route?.path}`);
    }
}