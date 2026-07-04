const { MongoClient } = require("mongodb");

let database;

const initDb = async (callback) => {
  if (database) {
    console.log("Database is already initialized.");
    return callback(null, database);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);

    database = client.db(process.env.DATABASE_NAME);

    console.log("Connected to MongoDB.");

    callback(null, database);
  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};