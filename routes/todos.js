const express = require('express');
const router=express.Router();
const {authenticate} = require('./../middlewares/authenticate');


//-------------> @GET ROUTES <-----------------//

router.get('/',authenticate,(req,res)=>{
   Todo.find().then((todos)=>{
     res.status(200).send({todos});
   },(error)=>{
        res.status(400).send({error});
   });
});

router.get('/:id',authenticate,(req,res)=>{
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


//-----------------> @POST ROUTES <------------------------//

router.post('/',authenticate,(req,res)=>{
  var todo=new Todo({
    text:req.body.text
  })
  todo.save().then((newTodo)=>{
    res.status(200).send(newTodo);
  },(e)=>{
    res.status(400).send(e);
  });
});


//--------------> PATCH(UPDATE PROPERTIES ) <----------------//

router.patch('/:id',authenticate,(req,res)=>{
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


module.exports = router;
