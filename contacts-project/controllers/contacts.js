const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .collection("contacts")
    .find();

  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid contact ID."
    });
  }

  const contactId = new ObjectId(id);

  try {
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
};