const PotsSchema = require("../Model/PotsSchema");

exports.addPots = async (req, res) => {
  let payload = req.body;
  await PotsSchema.create(payload);
  res.status(201).json({ success: true, message: "Pot Added", payload });
};

exports.showPots = async (req, res) => {
  let payload = await PotsSchema.find({});
  res.status(201).json({ success: true, message: "All Pots", payload });
};

exports.categoryPots = async (req, res) => {
  let payload = await PotsSchema.find({
    Category: `${req.params.Category} Pot`,
  });
  res
    .status(201)
    .json({ success: true, message: "Showing category plants", payload });
};

exports.onePot = async (req, res) => {
  const payload = await PotsSchema.findOne({ _id: req.params.id });
  res.status(201).json({ success: true, message: "One Pot", payload });
};
