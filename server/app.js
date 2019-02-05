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
    return res.status(404).send({message:'Invalid Id'})

   Todo.findById(id).then((todo)=>{
       if(!todo)
         return res.status(404).send({message:'Id not found'})

       res.status(200).send({message:`sucess on id ${id}`, todo})
   },(error)=>{
      res.status(400).send({message:'Error',error})
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
