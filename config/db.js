const mongoose = require('mongoose');
 
const  db = async ()=>{
  try{
    await mongoose.connect(`mongodb://127.0.0.1:27017/authentication`)
    console.log('Connected!')
  } catch(err){
    console.log(err)
  }
}


module.exports = db;