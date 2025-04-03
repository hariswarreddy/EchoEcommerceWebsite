import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

app.use(cors({
  origin: "https://echoecommercestore.onrender.com",
  credentials: true
}));

// Uncaught Error Handling
process.on("uncaughtRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log("Shutting down the server due to unHandled Promise rejection");
  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// Connecting Database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});

// Unhandled Error Handling
process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log("Shutting down the server due to unHandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
