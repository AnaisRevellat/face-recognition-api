import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "03841d455e9343ca966dc806e339f6fc",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("face-detection", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to join the API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    });
  // .catch((err) => res.status(400).json("unable to get count"));
};

// module.exports = {
//   handleImage,
//   handleApiCall,
// };

export { handleImage, handleApiCall };
