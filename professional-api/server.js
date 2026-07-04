require("dotenv").config();

const express = require("express");

const mongodb = require("./data/database");

const routes = require("./routes");

const app = express();

const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

// Connect to MongoDB before starting the server
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB.");
    console.error(err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API: http://localhost:${port}/professional`);
  });
});