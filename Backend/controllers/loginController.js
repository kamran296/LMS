const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const jwt = require("jsonwebtoken");

const hashed_password = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("Salt: ", salt);
    const passwordHashed = await bcrypt.hash(pass, salt);
    return passwordHashed;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

module.exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const alreadyExists = await Admin.findOne({ username });

    if (alreadyExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashPassword = await hashed_password(password);

    const newAdmin = new Admin({
      username: username,
      password: hashPassword,
    });

    await newAdmin.save();

    console.log("Admin created successfully");

    return res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error in creating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
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
