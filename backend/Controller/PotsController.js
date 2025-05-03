const PotsSchema = require("../Model/PotsSchema");

//! Add Pot Handler Function -------------------------------------------
exports.addPots = async (req, res) => {
  const payload = req.body;
  await PotsSchema.create(payload);
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Show All Pots Handler Function -------------------------------------------
exports.showPots = async (req, res) => {
  const payload = await PotsSchema.find({});
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show All Pots of Same Category Handler Function -------------------------------------------
exports.categoryPots = async (req, res) => {
  const payload = await PotsSchema.find({
    Category: `${req.params.category} Pot`,
  });
  res
    .status(201)
    .json({ status: "Success", resources: payload.length, data: { payload } });
};

//! Show One Pot Handler Function -------------------------------------------
exports.onePot = async (req, res) => {
  const id = req.params.id;
  const payload = await PotsSchema.findOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};

//! Delete One Pot Handler Function -------------------------------------------
exports.deletePot = async (req, res) => {
  const id = req.params.id;
  const payload = await PotsSchema.deleteOne({ _id: id });
  res.status(201).json({ status: "Success", data: { payload } });
};
