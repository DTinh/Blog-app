import express from "express";
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/read', homeController.getAllPost);
    router.get('/read-detail-by-id', homeController.getDetailPost);
    router.post('/create', homeController.createPost);
    router.delete('/delete', homeController.deletePost);
    router.put('/update', homeController.updatePost);

    return app.use("/api", router);
}

module.exports = initWebRoutes;
