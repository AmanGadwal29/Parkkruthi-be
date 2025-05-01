const getModel = require("../Model/ProductsSchema");

const validCategories = ["plants", "pots", "fertilizers"];

exports.addItem = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const Model = getModel(category);
    const newItem = await Model.create(req.body);
    res.status(201).json({ success: true, message: `${category} added`, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    // Get the category from the base URL (e.g., /plants)
    const category = req.baseUrl.split('/')[1];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const Model = getModel(category);
    const items = await Model.find({});
    res.status(200).json({ success: true, message: `All ${category}`, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const { category, sub } = req.params;
    const Model = getModel(category);
    const items = await Model.find({ Category: sub });
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOneItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    const Model = getModel(category);
    const item = await Model.findById(id);
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    const Model = getModel(category);
    const result = await Model.deleteOne({ _id: id });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
