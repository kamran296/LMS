// enquiryFormController.js
const EnquiryForm = require("../models/enquiryForm");

module.exports.getallenquiry = async () => {
  try {
    const enquiry = await EnquiryForm.find();
    res.status(200).json({ enquiry });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.createEnquiry = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newEnquiryForm = new EnquiryForm({
      name,
      email,
      message,
    });

    await newEnquiryForm.save();
    res.status(201).json({ newEnquiryForm });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getEnquiryFormById = async (req, res) => {
  const { enquiryFormId } = req.params;

  try {
    const enquiryForm = await EnquiryForm.findById(enquiryFormId);
    if (!enquiryForm) {
      return res.status(404).send("Enquiry form not found");
    }

    res.status(200).json(enquiryForm);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
