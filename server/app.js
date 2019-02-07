const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./database/mongoose-db');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const port=process.env.PORT || 3000;


const app=express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo=new Todo({
    text:req.body.text
  })
  todo.save().then((newTodo)=>{
    res.status(200).send(newTodo);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
   Todo.find().then((todos)=>{
     res.status(200).send({todos});
   },(error)=>{
        res.status(400).send({error});
   });
});

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;

  if(!ObjectID.isValid(id))
    return res.status(404).send({message:'Invalid Id'});

   Todo.findById(id).then((todo)=>{
       if(!todo)
         return res.status(404).send({message:'Id not found'})

       res.status(200).send({message:`sucess on id ${id}`, todo})
   },(error)=>{
      res.status(400).send({message:'Error',error})
   });
});


app.patch('/todos/:id',(req,res)=>{
  var id=req.body.id;
  var body=_.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id))
    return res.status(404).send({message:'Invalid Id'});

  if(_.isBoolean(body.completed) && body.completed)
    body.completedAt=new Date().getTime();
  else{
    body.completed=false;
    body.completedAt=null;
  }

   Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo)
     return res.status(404).send();

     res.send(todo);
   },(error)=>{
      res.send(400).send({error});
   });

});

app.post('/users',(req,res)=>{
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

app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
});

module.exports = {app};

// var newUser=new User({
//   name:'Vishesh',
//   password:12345667,
//   age:24
// });
//
// var newTodo=new Todo({
//   text:"Complete Rest Api"
// })
//
// newUser.save().then((user)=>{
//   console.log('Saved User ',user);
// },(e)=>{
//   console.log('unable to save user',e);
// });
