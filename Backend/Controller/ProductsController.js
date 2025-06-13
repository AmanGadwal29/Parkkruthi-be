const mongoose = require("mongoose");
const webpush = require("web-push");
require("dotenv").config();
const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

//! Product Schema Manager -------------------------------------------
const schemaManager = require("../Model/ProductSchema");

//! Subscribed Users -------------------------------------------
const Subscription = require("../Model/SubscribedUserSchema");

//! Set VAPID -------------------------------------------
PRIVATE_KEY &&
  PUBLIC_KEY &&
  webpush.setVapidDetails(
    "mailto:amangadwal001@example.com",
    PUBLIC_KEY,
    PRIVATE_KEY
  );

//! Handler Functions -------------------------------------------
//? Add Product HF
exports.addProduct = async (req, res) => {
  try {
    const productType = req.params.productType;
    const payload = req.body;
    const imageUrls = req?.files?.map((file) => file.path);

    const product = schemaManager(productType);

    const document = await product.create({
      ...payload,
      CategoryRoute: payload.Category?.toLowerCase().replace(/\s+/g, "") + "s",
      ImageURL: imageUrls,
      ProductType: productType,
    });

    //fetching all subscribed users
    const subscriptions = await Subscription.find();
    //notification payload
    const notificationPayload = JSON.stringify({
      title: "New Product Added",
      body: `Check out the new product: ${payload.Title}`,
    });

    // Send notifications to all subscribers
    subscriptions.forEach((sub) => {
      webpush
        .sendNotification(sub, notificationPayload)
        .catch((err) => console.error("Notification error:", err));
    });
    res.status(201).json({ status: "Success", data: { document } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! R
//? Show All Products HF
exports.allProductsCatalogue = async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const productCollections = collections.map((col) => col.name);

    const allProducts = [];

    for (const collectionName of productCollections) {
      const productModel = schemaManager(collectionName);
      const products = await productModel.find({});

      const formatted = products.map((product) => {
        const { Image, ...rest } = product._doc;
        return {
          ...rest,
          ImageURL: product.ImageURL || [],
          ProductType: collectionName,
        };
      });

      allProducts.push(...formatted);
    }

    res.status(200).json({
      status: "Success",
      resources: allProducts.length,
      data: { allProducts },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.showAllProducts = async (req, res) => {
  try {
    const productType = req.params.productType;

    const product = schemaManager(productType);

    const payload = await product.find({});

    const finalPayload = payload.map((product) => {
      const { Image, ...rest } = product._doc;

      return {
        ...rest,
        ImageURL: product.ImageURL || [],
      };
    });

    res.status(200).json({
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
    const { productType, category } = req.params;

    const product = schemaManager(productType);

    const payload = await product.find({
      CategoryRoute: category,
    });

    if (payload.length === 0) {
      res
        .status(404)
        .json({ message: "Category does not exist or couldn't be found" });
    } else {
      const finalPayload = payload.map((product) => {
        const { Image, ...rest } = product._doc;

        return {
          ...rest,
          ImageURL: product.ImageURL || [],
        };
      });
      res.status(200).json({
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
    const { productType, id } = req.params;

    const product = schemaManager(productType);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const payload = await product.findOne({ _id: id });

    const { Image, ...rest } = payload._doc;

    const finalPayload = {
      ...rest,
      ImageURL: product.ImageURL || [],
    };

    !finalPayload
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json({ status: "Success", data: { finalPayload } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! U
//? Edit Product HF
exports.editProduct = async (req, res) => {
  try {
    const { productType, id } = req.params;
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = schemaManager(productType);

    const updatedProduct = await product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ status: "Success", data: { updatedProduct } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! D
//? Delete All Products HF
exports.deleteAllProducts = async (req, res) => {
  try {
    const productType = req.params.productType;

    const product = schemaManager(productType);

    await product.deleteMany();
    res.status(200).json({
      status: "Success",
      message: "All products removed...",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//? Delete One Product HF
exports.deleteOneProduct = async (req, res) => {
  try {
    const { productType, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = schemaManager(productType);

    const deletePayload = await product.deleteOne({ _id: id });
    !deletePayload
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json({
          status: "Success",
          message: "Product removed...",
        });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
