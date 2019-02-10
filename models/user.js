const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
    type:Number
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
  })
  .catch((error)=>console.log('Error in creating auth'));
};

userSchema.statics.findByToken=function (token){
  var user=this;
  var decoded;
  try{
  decoded=jwt.verify(token,'abc123');
  }
  catch(e){
    return new Promise((sucess,reject)=>{
      reject();
    });
  }

  return user.findOne({
    _id:decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};

 userSchema.pre('save',function(next) {
   var user=this;

    if( !user.isModified('password')){
        bcrypt.genSalt(10,(error,salt)=>{
           bcrypt.hash(user.password,salt,(error,hash)=>{
              user.password=hash;
              next();
           });
        });
    }
    else
      next();
 });

var User =mongoose.model('Users',userSchema);
 module.exports = {User};
