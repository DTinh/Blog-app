import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from './route/api';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '10mb' })); // Bạn có thể thay đổi giới hạn tùy theo nhu cầu

// Tăng giới hạn kích thước của yêu cầu form data
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})