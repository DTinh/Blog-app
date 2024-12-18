import express from "express";
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/read', homeController.getAllPost);

    return app.use("/api", router);
}

module.exports = initWebRoutes;
