const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECERT;

const loginData = (req, res, next) => {
  //    To get the id from the auth token
  const token = req.header("authToken");
  console.log(token, 123);
  // console.log(token);
  if (!token) {
    res.status(401).json("Please authenticate using a valid token");
    return;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (!data) {
      res.status(404).json("error in data");
    }
    req.user = data.user;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json("Error from middleware authentication");
  }
};

module.exports = loginData;
