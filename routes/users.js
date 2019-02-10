const express = require('express');
const router=express.Router();
const {authenticate} = require('./../middlewares/authenticate');


//-------------> @GET ROUTES <-----------------//

router.get('/loginuser',(req,res)=>{
  var {email,password}= _.pick(req.body,['email','password']);

  User.findOne({email}).then((user)=>{
    bcrypt.compare(password,hashedPassword,(error,result)=>{
      if(result){
        res.header('x-auth',user.tokens.token).send({user});
      }
      else {
        res.send({error:'Incorrect Info'});
      }
    });
  }).catch((error)=>{
     res.status(500).send({message:'unable to login',error})
  });
});



//-----------------> @POST ROUTES <------------------------//

router.post('/users',(req,res)=>{
  var userBody=_.pick(req.body,['name','password','age','email']);
  var user=new User(userBody);

  user.save().then(()=>{
    var token= user.generateAuthToken();
    console.log('Token',token);
    return token;
  })
  .then((token)=>{
    res.header('x-auth',token).send({status:'ok',user})
  })
  .catch((error)=>{
     res.status(400).send({status:'error',error});
  });
});

module.exports = router;
