//importing dependencies
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//importing functions
import connectToDb from "./database/db.js";

//creating the app,PORT and configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//working on the cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "DELETE", "POST", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
    ],
    credentials: true,
  })
);

//cookie parser
app.use(cookieParser());

//json
app.use(express.json());

//running the server
app.listen(PORT, () => {
  console.log(`Server connected successfully on port ${PORT}`);
  connectToDb();
});
