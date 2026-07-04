const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const mongodb = require("./data/database");
const routes = require("./routes");

const port = process.env.PORT || 8080.;

app.use(express.json());
app.use("/", routes);

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:");
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});