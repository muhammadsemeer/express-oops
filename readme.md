# Express OOPS - A simple express server with OOPs

[![npm version](https://img.shields.io/npm/v/express-oops.svg)](https://www.npmjs.com/package/express-oops)

We have seen lot's of examples of express server function based approaches. So I just created a simple express server with OOPs.

## Now We can use express in Class Based Approach

# Installation

```
npm i express-oops
```

Also make sure that you have Node.js 14 or newer in order to use it.

## Create A Server

```
const { Server } = require('express-oops');

const express = require('express');
const app = express();

const server = new Server(app, 3000);

server.start();
```

This will start a server on port 3000.

## Create A Controller

```
const { Server, Controller, Methods } = require("express-oops");
const express = require("express");

const server = new Server(express(), 3000);

class IndexController extends Controller {
  path = "";
  routerMiddleWares = [];

  routes = [
    {
      method: Methods.GET,
      path: "/",
      handler: this.index,
    },
  ];

  index(req, res) {
    res.send("Hello World!");
  }
}

server.start(() => console.log("Server started"));
server.loadControllers([new IndexController()]);
```

## Add Middlewares

1. Global Middlewares
   This middleware are invoked on every request.

    ```
    const { Server, Controller, Methods } = require("express-oops");
    const express = require("express");

    const server = new Server(express(), 3000);

    class IndexController extends Controller {
    path = "";
    routerMiddleWares = [];

    routes = [
        {
        method: Methods.GET,
        path: "/",
        handler: this.index,
        },
    ];

    index(req, res) {
        res.send("Hello World!");
    }
    }

    server.start(() => console.log("Server started"));
    server.loadGlobalMiddleWares([
    (req, res, next) => {
        console.log("Middleware 1");
        next();
    },
    ]);
    server.loadControllers([new IndexController()]);
    ```

1. Controller Level Middleware
   This middleware are invoked only on the routes that are defined in the controller.

    for example: if we have a Controller with path `/user/`. We need to use a function in every request that is defined in the controller.

    ```
    const { Server, Controller, Methods } = require("express-oops");
    const express = require("express");

    const server = new Server(express(), 3000);

    class IndexController extends Controller {
    path = "";
    routerMiddleWares = [
        [
        (req, res, next) => {
            console.log("Middleware 1");
            next();
        },
        ]
    ];

    routes = [
        {
        method: Methods.GET,
        path: "/",
        handler: this.index,
        },
    ];

    index(req, res) {
        res.send("Hello World!");
    }
    }

    server.start(() => console.log("Server started"));
    server.loadControllers([new IndexController()]);
    ```

1. Local Middlewares
   Middlewares are defined in the route.

    ```
    const { Server, Controller, Methods } = require("express-oops");
    const express = require("express");

    const server = new Server(express(), 3000);

    class IndexController extends Controller {
    path = "";
    routerMiddleWares = [];

    routes = [
        {
        method: Methods.GET,
        path: "/",
        handler: this.index,
        localMiddleWares: [
            (req, res, next) => {
            console.log("Middleware 1");
            next();
            },
        ],
        },
    ];

    index(req, res) {
        res.send("Hello World!");
    }
    }

    server.start(() => console.log("Server started"));
    server.loadControllers([new IndexController()]);
    ```