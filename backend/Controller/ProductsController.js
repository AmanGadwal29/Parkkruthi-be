//! All Schemas -------------------------------------------
const schemaModels = {
  plants: require("../Model/PlantsSchema"),
  pots: require("../Model/PotsSchema"),
  fertilizers: require("../Model/FertilizersSchema"),
};

//! Acquiring Required Schema -------------------------------------------
const getSchema = (productType) => {
  const schema = schemaModels[productType];
  if (!schema) throw new Error("Invalid product type");
  return schema;
};

//! CRUD Operations -------------------------------------------
//! C
//? Add Product Handler Function(HF)
exports.addProduct = async (req, res) => {
  try {
    const productType = req.params.productType;
    const payload = req.body;

    //Getting the Schema
    const schema = getSchema(productType);

    await schema.create({
      ...payload,
      CategoryRoute: payload.Category.toLowerCase().replace(/\s+/g, ""),
      Image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });
    res.status(201).json({ status: "Success", data: { payload } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! R
//? Show All Products HF
exports.showAllProducts = async (req, res) => {
  try {
    const productType = req.params.productType;

    //Getting the Schema
    const schema = getSchema(productType);

    const payload = await schema.find({});
    res.status(201).json({
      status: "Success",
      resources: payload.length,
      data: { payload },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//? Show All Products of Same Category HF
exports.showCategoryProducts = async (req, res) => {
  try {
    const productType = req.params.productType;
    const category = req.params.category;

    //Getting the Schema
    const schema = getSchema(productType);

    const payload = await schema.find({
      CategoryRoute: category,
    });
    res.status(201).json({
      status: "Success",
      resources: payload.length,
      data: { payload },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//? Show One Product HF
exports.showOneProduct = async (req, res) => {
  try {
    const productType = req.params.productType;
    const id = req.params.id;

    //Getting the Schema
    const schema = getSchema(productType);

    const payload = await schema.findOne({ _id: id });
    !payload
      ? res.status(404).json({ message: "Product not found" })
      : res.status(201).json({ status: "Success", data: { payload } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! U
//? Edit Product HF
exports.editProduct = async (req, res) => {
  try {
    const productType = req.params.productType;
    const id = req.params.id;
    const payload = req.body;
    if (!payload) res.status(404).json({ message: "Product not found" });

    //Getting the Schema
    const schema = getSchema(productType);

    await schema.updateOne({ _id: id }, { $set: payload });
    res.status(201).json({ status: "Success", data: { payload } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! D
//? Delete All Products HF
exports.deleteAllProducts = async (req, res) => {
  try {
    const productType = req.params.productType;

    //Getting the Schema
    const schema = getSchema(productType);

    await schema.deleteMany();
    res.status(201).json({
      status: "Success",
      message: "All products removed successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//? Delete One Product HF
exports.deleteOneProduct = async (req, res) => {
  try {
    const productType = req.params.productType;

    //Getting the Schema
    const schema = getSchema(productType);

    const id = req.params.id;
    const deletePayload = await schema.deleteOne({ _id: id });
    !deletePayload
      ? res.status(404).json({ message: "Product not found" })
      : res.status(201).json({
          status: "Success",
          message: "Product removed successfully",
        });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
