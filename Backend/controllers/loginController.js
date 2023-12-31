const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const password = process.env.DEFAULT_PASSWORD;
const username = process.env.DEFAULT_USERNAME;
const jwt = require("jsonwebtoken");

const hashed_password = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  console.log("salt1", salt);
  const password_hashed = await bcrypt.hash(password, salt);
  return password_hashed;
};
module.exports.initializeAdmin = async () => {
  try {
    const alreadyExits = await Admin.findOne({ username });
    if (!alreadyExits) {
      const hash_password = await hashed_password(password);

      const newAdmin = new Admin({
        username: username,
        password: hash_password,
      });
      await newAdmin.save();
      console.log("admin created successfully");
    }
  } catch (err) {
    console.log("error in login ", err);
    return "404";
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(process.env.JWT_SECERT);
  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    // Check if the admin exists
    if (!admin) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // Compare the provided password with the hashed password from the database
    const passwordCompare = await bcrypt.compare(password, admin.password);

    // If the passwords don't match, return an error
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // If the passwords match, generate an authentication token
    const data = {
      admin: {
        id: admin.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECERT);

    // Respond with success and the authentication token
    res.status(200).json({
      success: true,
      authToken,
    });
  } catch (err) {
    // Handle any errors that occurred during the login process
    res.status(500).json({
      status: "error from login side",
      message: err.message,
    });
  }
};
