import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" with { type: "json" };
import booksRoutes from "./routes/booksRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Database Error:", error.message);
  });

// ROUTES
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/auth", authRoutes);

// SWAGGER
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Library Management API is running");
});

// ERROR HANDLER
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message
  });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});