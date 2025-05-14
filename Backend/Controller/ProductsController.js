const mongoose = require("mongoose");

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

//! Acquiring Product Image -------------------------------------------
exports.getProductImage = async (req, res) => {
  try {
    const productType = req.params.productType;
    const id = req.params.id;

    //Getting the Schema
    const schema = getSchema(productType);

    const product = await schema.findById(id);
    if (!product || !product.Image) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", product.Image.contentType);
    res.send(product.Image.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
      CategoryRoute: payload.Category.toLowerCase().replace(/\s+/g, "") + "s",
      Image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
      ImageURL: req.file
        ? `/api/v1/products/${productType}/images/id/${new mongoose.Types.ObjectId()}`
        : null,
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

    // Sending final payload
    const finalPayload = payload.map((product) => {
      // Excluding unnecessary image buffer data
      const { Image, ...rest } = product._doc;

      // Final payload
      return {
        ...rest,
        ImageURL: product.Image
          ? `/api/v1/products/${productType}/images/id/${product._id}`
          : null,
      };
    });

    res.status(201).json({
      status: "Success",
      resources: finalPayload.length,
      data: { finalPayload },
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

    if (payload.length === 0) {
      res
        .status(404)
        .json({ message: "Category does not exist or couldn't be found" });
    } else {
      // Sending final payload
      const finalPayload = payload.map((product) => {
        // Excluding unnecessary image buffer data
        const { Image, ...rest } = product._doc;

        // Final payload
        return {
          ...rest,
          ImageURL: product.Image
            ? `/api/v1/products/${productType}/images/id/${product._id}`
            : null,
        };
      });
      res.status(201).json({
        status: "Success",
        resources: finalPayload.length,
        data: { finalPayload },
      });
    }
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

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const payload = await schema.findOne({ _id: id });

    // Excluding unnecessary image buffer data
    const { Image, ...rest } = payload._doc;

    // Sending final payload
    const finalPayload = {
      ...rest,
      ImageURL: payload.Image
        ? `/api/v1/products/${productType}/images/id/${payload._id}`
        : null,
    };

    !finalPayload
      ? res.status(404).json({ message: "Product not found" })
      : res.status(201).json({ status: "Success", data: { finalPayload } });
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
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    //Getting the Schema
    const schema = getSchema(productType);

    const existingProduct = await schema.findOne({ _id: id });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

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
