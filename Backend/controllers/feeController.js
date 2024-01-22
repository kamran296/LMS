const Fee = require("../models/feeModel");

// Controller to get all fees
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("admission_id");
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific fee by ID
exports.getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.feeId).populate("admission_id");
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new fee
exports.createFee = async (req, res) => {
  const { admission_id, amount, paidamount, status } = req.body;

  try {
    const newFee = new Fee({ admission_id, amount, paidamount, status });
    await newFee.save();
    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a fee
exports.updateFee = async (req, res) => {
  const updateFields = req.body;
  const { feeId } = req.params;

  try {
    const fee = await Fee.findByIdAndUpdate(feeId, updateFields, {
      new: true,
    }).populate("admission_id");

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a fee
exports.deleteFee = async (req, res) => {
  const { feeId } = req.params;

  try {
    const fee = await Fee.findByIdAndDelete(feeId);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    res.json({ message: "Fee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
