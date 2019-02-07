const {mongoose} = require('./../server/database/mongoose-db');
const {Todo} = require('./../server/models/todo');
var _id='6c586bcb0b9cf311fafb86b2';

Todo.find({_id})
 .then((todos)=>{
   console.log('Todos',todos);
 });

 Todo.findOne({_id})

 .then((todo)=>{
   console.log('Todo',todo);
 });
 Todo.findById(_id).then((todo)=>{
   if(!todo){
   return  console.log('Id not Found');
  }
   console.log('Todo by id',todo);
 });
