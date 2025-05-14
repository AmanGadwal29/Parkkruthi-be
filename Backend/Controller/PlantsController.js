const PlantsSchema = require("../Model/PlantsSchema");

exports.addPlants = async (req, res) => {
  try {
    const payload = req.body;
    const result = await PlantsSchema.create(payload);
    res.status(201).json({ success: true, message: "Plant added", payload: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add plant", error: error.message });
  }
};

exports.showPlants = async (req, res) => {
  try {
    const payload = await PlantsSchema.find({});
    res.status(200).json({ success: true, message: "All plants", payload });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch plants", error: error.message });
  }
};

exports.categoryPlants = async (req, res) => {
  try {
    const payload = await PlantsSchema.find({
      Category: req.params.Category,
    });
    res.status(200).json({ success: true, message: "Category plants", payload });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch category plants", error: error.message });
  }
};

exports.onePlant = async (req, res) => {
  try {
    const payload = await PlantsSchema.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "One plant", payload });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch plant", error: error.message });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const payload = await PlantsSchema.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Deleted", payload });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete plant", error: error.message });
  }
};
