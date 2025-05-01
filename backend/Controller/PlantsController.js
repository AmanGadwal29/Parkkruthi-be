const PlantsSchema = require("../Model/PlantsSchema");

//! Add Plant Handler Function----------------------------------
exports.addPlants = async (req, res) => {
  let payload = req.body;
  await PlantsSchema.create(payload);
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Show All Plants Handler Function----------------------------------
exports.showPlants = async (req, res) => {
  let payload = await PlantsSchema.find({});
  res.status(200).json({ success: true, message: "All plants", payload });
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show All Plants of Same Category Handler Function----------------------------------
exports.categoryPlants = async (req, res) => {
  let payload = await PlantsSchema.find({
    Category: `${req.params.Category}`,
    Category: `${req.params.category} Plants`,
  });
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show One Plant Handler Function----------------------------------
exports.onePlant = async (req, res) => {
  const payload = await PlantsSchema.findOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "one plant", payload });
  const id = req.params.id;
  const payload = await PlantsSchema.find({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Delete One Plant Handler Function----------------------------------
exports.deletePlant = async (req, res) => {
  let payload = await PlantsSchema.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Deleted", payload });
  const id = req.params.id;
  let payload = await PlantsSchema.deleteOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};
