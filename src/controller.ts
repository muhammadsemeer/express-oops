import { Router, RequestHandler } from "express";

// HTTP method
export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface IRoute {
    path: string;
    method: Methods;
    handler: RequestHandler;
    localMiddleWares?: RequestHandler[];
}

export abstract class Controller {
    // express router
    public router: Router = Router();

    // base path for all routes in this controller
    public abstract path: string;

    // routers under the controller
    public abstract readonly routes: IRoute[];

    // middleware of all routes under this router
    public abstract readonly routerMiddleWares: RequestHandler[] | [];

    public setRoutes(): Router {
        // eslint-disable-next-line
        for (const route of this.routes) {
            switch (route.method) {
                case "GET":
                    this.router.get(
                        route.path,
                        route.localMiddleWares || [],
                        route.handler
                    );
                    break;
                case "POST":
                    this.router.post(
                        route.path,
                        route.localMiddleWares || [],
                        route.handler
                    );
                    break;
                case "PUT":
                    this.router.put(
                        route.path,
                        route.localMiddleWares || [],
                        route.handler
                    );
                    break;
                case "DELETE":
                    this.router.delete(
                        route.path,
                        route.localMiddleWares || [],
                        route.handler
                    );
                    break;
                default:
                    break;
            }
        }
        return this.router;
    }
}
