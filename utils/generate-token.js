const jwt = require('jsonwebtoken');

const generateToken = (data) =>{
  return jwt.sign(data, "myPrivateKey")
}

module.exports = generateToken