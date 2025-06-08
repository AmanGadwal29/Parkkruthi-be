const AddressSchema = require("../Model/AddressSchema");

//!Add Address--------------------------------------------------
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      FirstName,
      LastName,
      Phone,
      Street1,
      Street2,
      Landmark,
      City,
      State,
      Pincode,
    } = req.body;

    const payload = {
      user: userId,
      FirstName,
      LastName,
      Phone,
      Street1,
      Street2,
      Landmark,
      City,
      State,
      Pincode,
    };

    const newAddress = await AddressSchema.create(payload);

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await AddressSchema.find({ user: userId });

    res.json({
      success: true,
      message: "Addresses fetched successfully",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

//!Update Address--------------------------------------------------
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Explicitly pick only the allowed fields to update (no user)
    const {
      FirstName,
      LastName,
      Phone,
      Street1,
      Street2,
      Landmark,
      City,
      State,
      Pincode,
    } = req.body;

    const payload = {
      FirstName,
      LastName,
      Phone,
      Street1,
      Street2,
      Landmark,
      City,
      State,
      Pincode,
    };

    const updated = await AddressSchema.findOneAndUpdate(
      { _id: addressId, user: userId },
      payload,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    res.json({ success: true, message: "Address updated", address: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

//!Delete Address------------------------------------------------
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const deleted = await AddressSchema.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found or unauthorized" });
    }

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
