const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "010e9af0b5744483ba4fbab6eb22af45"
});

const handleApiCall = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => err.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get count"));
};

module.exports = {
  handleImage,
  handleApiCall
};
