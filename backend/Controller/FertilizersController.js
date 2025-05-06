const FertilizersSchema = require("../Model/FertilizersSchema");

//! Add Fertilizer Handler Function -------------------------------------------
exports.addFertilizers = async (req, res) => {
  const payload = req.body;
  await FertilizersSchema.create(payload);
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Show All Fertilizers Handler Function -------------------------------------------
exports.showFertilizers = async (req, res) => {
  const payload = await FertilizersSchema.find({});
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show All Fertilizers of Same Category Handler Function -------------------------------------------
exports.categoryFertilizers = async (req, res) => {
  const payload = await FertilizersSchema.find({
    Category: `${req.params.category} Fertilizer`,
  });
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show One Fertilizer Handler Function -------------------------------------------
exports.oneFertilizer = async (req, res) => {
  const id = req.params.id;
  const payload = await FertilizersSchema.findOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Delete One Fertilizer Handler Function -------------------------------------------
exports.deleteFertilizer = async (req, res) => {
  const id = req.params.id;
  const payload = await FertilizersSchema.deleteOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};
