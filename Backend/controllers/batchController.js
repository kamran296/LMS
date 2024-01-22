const Batch = require("../models/batch");

// Controller to get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate("course");
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific batch by ID
exports.getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.batchId).populate("course");
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new batch
exports.createBatch = async (req, res) => {
  const { batchname, teacher, course } = req.body;

  try {
    const batchExists = await Batch.find({ batchname });
    if (batchExists.length > 0) {
      return res.status(400).json("Batch Already Exits create a new batch");
    }
    const newBatch = new Batch({ batchname, teacher, course });
    await newBatch.save();
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a batch
exports.updateBatch = async (req, res) => {
  const updateFields = req.body;
  const { batchId } = req.params;

  try {
    const existingBatch = await Batch.findOne({
      batchname: updateFields.batchname,
    });

    if (existingBatch && existingBatch._id.toString() !== batchId) {
      return res
        .status(400)
        .json({ message: "Batch with the same name already exists" });
    }
    const batch = await Batch.findByIdAndUpdate(batchId, updateFields, {
      new: true,
    }).populate("course");

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a batch
exports.deleteBatch = async (req, res) => {
  const { batchId } = req.params;

  try {
    const batch = await Batch.findByIdAndDelete(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
