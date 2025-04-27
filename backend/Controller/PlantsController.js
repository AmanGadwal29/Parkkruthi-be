const PlantsSchema = require("../Model/PlantsSchema");

exports.addPlants = async (req, res) => {
  let payload = req.body;
  await PlantsSchema.create(payload);
  res.status(201).json({ success: true, message: "Plant added", payload });
};

exports.showPlants = async (req, res) => {
  let payload = await PlantsSchema.find({});
  res.status(200).json({ success: true, message: "All plants", payload });
};

exports.categoryPlants = async (req, res) => {
  let payload = await PlantsSchema.find({
    Category: `${req.params.Category}`,
  });
  res
    .status(200)
    .json({ success: true, message: "Showing category plants", payload });
};

exports.onePlant = async (req, res) => {
  const payload = await PlantsSchema.findOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "one plant", payload });
};

exports.deletePlant = async (req, res) => {
  let payload = await PlantsSchema.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Deleted", payload });
};
