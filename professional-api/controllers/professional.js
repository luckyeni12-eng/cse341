const mongodb = require("../data/database");

const getProfessional = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db
      .collection("professional")
      .find({})
      .limit(1)
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({
        message: "No professional record found."
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while retrieving professional data."
    });
  }
};

module.exports = {
  getProfessional
};