const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

dotenv.config();

const app = express();

const mongodb = require("./data/database");
const routes = require("./routes");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});