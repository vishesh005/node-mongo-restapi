const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var promise=mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });
promise.then(()=>{
 console.log('Mongoose is up and running');
},
(error)=>{
console.log('Mongoose is unable to connect');
});

module.exports={mongoose};
