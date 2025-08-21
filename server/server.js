//importing dependencies
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

//importing functions
import authRouter from "./routes/auth.routes.js";
import connectToDB from "./database/db.js";
import productsRouter from "./routes/products.routes.js";
import shopProductsRouter from "./routes/shop.products.routes.js";

//creating app
const app = express();
const PORT = process.env.PORT || 5000;

//using the app dependencies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "DELETE", "PUT", "GET"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
    ],
    credentials: true,
  })
);

//using the functions
app.use("/api/auth", authRouter);
app.use("/api/admin/products", productsRouter);
app.use("/api/shop/products", shopProductsRouter);

//listening to the app
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
