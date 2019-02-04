const mongoose = require('mongoose');
var User =mongoose.model('Users',{
  name:{
    type:String,
    required:true,
    minLength:3,
    trim:true
  },
  password:{
    type:String,
    required:true,
    minLength:8,
    trim:true
  }
  ,
  age:{
    type:Number,
    default:00
  },
  email:{
    type:String,
    default:'null@null.com'
  },
  joinedAt:{
    type:String,
    default:new Date().toTimeString()
  }
})
 module.exports = {User};
