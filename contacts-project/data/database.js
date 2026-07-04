const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error("MONGODB_URI is not defined in the .env file."));
  }

  MongoClient.connect(uri)
    .then((client) => {
      database = client.db(process.env.DATABASE_NAME);
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized. Call initDb first.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb,
};