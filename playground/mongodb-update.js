const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
   return console.log('Unable to connect to MongoDB server');

   db.collection('Todos').findOneAndUpdate({
     _id:new ObjectID('5c56fe4a908ad1be02dd05ee')
   })


   // db.close();
});
