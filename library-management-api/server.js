import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" with { type: "json" };

import booksRoutes from "./routes/booksRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";


// Load environment variables
dotenv.config();


const app = express();


// Middleware
app.use(express.json());


// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


// Routes
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("Library Management API Running");
});


// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// Error Handler
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });

});


// Port with fallback value
const PORT = process.env.PORT || 3000;


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        console.log("Connected to MongoDB");


        app.listen(PORT, () => {

            console.log(`Server running at http://localhost:${PORT}`);

        });

    })
    .catch(error => {

        console.error("MongoDB connection error:", error);

    });