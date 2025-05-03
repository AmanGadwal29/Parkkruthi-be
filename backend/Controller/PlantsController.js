const PlantsSchema = require("../Model/PlantsSchema");

//! Add Plant Handler Function -------------------------------------------
exports.addPlants = async (req, res) => {
  const payload = req.body;
  await PlantsSchema.create(payload);
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Show All Plants Handler Function -------------------------------------------
exports.showPlants = async (req, res) => {
  const payload = await PlantsSchema.find({});
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show All Plants of Same Category Handler Function -------------------------------------------
exports.categoryPlants = async (req, res) => {
  const payload = await PlantsSchema.find({
    Category: `${req.params.category} Plant`,
  });
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show One Plant Handler Function -------------------------------------------
exports.onePlant = async (req, res) => {
  const id = req.params.id;
  const payload = await PlantsSchema.findOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Delete One Plant Handler Function -------------------------------------------
exports.deletePlant = async (req, res) => {
  const id = req.params.id;
  const payload = await PlantsSchema.deleteOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};
