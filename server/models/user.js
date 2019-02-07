const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var userSchema=new mongoose.Schema({
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
    required:true,
    trim:true,
    minLength:4,
    unique:true,
    validate:{
      validator:validator.isEmail,
      required:'{VALUE} is not valid email'
    }
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

userSchema.methods.toJSON=function() {
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['age','_id','name','email']);
};

userSchema.methods.generateAuthToken=function(){
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  }).catch((error)=>console.log('Error in creating auth'));
};
var User =mongoose.model('Users',userSchema);
 module.exports = {User};
