// imports

import express from "express";
const app = express();
import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/userRoute.js";
import product from "../backend/routes/productRoute.js";
import cookieParser from "cookie-parser";
import order from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import payment from "./routes/paymentRoute.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}
dotenv.config();


app.use(cors({
  origin: "https://echoecommercestore.onrender.com",
  credentials: true
}));

// middlewares
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({  limit: "100mb",extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));


// Route imports
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})
// Middleware for Errors

app.use(errorMiddleware);

export default app;
