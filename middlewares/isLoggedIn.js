const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');


module.exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, "myPrivateKey");
      const user = await userModel.findOne({ email: data.email }).select('-password');
      if (!user) {
        return res.status(401).send("Not Authorized, User not found.");
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).send("Not Authorized");
    }
  } else {
    return res.status(401).send("Not Authorized, You don't have permission to access");
  }
};



