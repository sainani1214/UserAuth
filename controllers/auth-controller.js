const express = require('express');
const app = express();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generate-token')

app.use(express.json());
app.use(express.urlencoded({extended : true}))

module.exports.registerUser = async (req, res) =>{
  const {name, email, username, password} = req.body;

  try{
    let user = await userModel.findOne({email});

  if(user){
    return res.status(400).json({
      success : "false",
      message : "Your account already exists, Please login",
    })
  }

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt)

  user = await userModel.create({
    name,
    username,
    email,
    password : hash
  })

  let token = generateToken({email});

  res.cookie("token", token, {
    httpOnly : true,
    secure : true
  })



  res.status(201).send(user)
  }catch(err){
    res.status(500).send("Internal server error")
  }

}


module.exports.loginUser = async (req, res)=>{
  let {email, password} = req.body;

  try{
    let user = await userModel.findOne({email});

  if(!user){
    return res.status.send("email or password incorrect")
  }

  let result = await bcrypt.compare(password, user.password);

  if(result){
    let token = generateToken({email});

    res.cookie("token", token, {
      httpOnly : true,
      secure : true
    })

    res.status(201).send(user)
  }
}catch(err){
  res.status(500).send("Internal server error")
} 

}

module.exports.logoutUser = async (req, res) =>{
  try{
    res.cookie("token", "", {
      httpOnly : true,
      secure : true
    })
    res.status(200).send("User Logged out successfully")
  }catch(err){
    res.send("Internal server error")
  }
}


module.exports.getUserProfile = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      user,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

