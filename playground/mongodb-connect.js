const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
   return console.log('Unable to connect to MongoDB server');

   console.log(`Mongo server is up and running `);
   db.collection('Todos').insertOne({
     text: "Do Something",
     comppleted:false
   },(err,result)=>{
     if(err)
     return console.log('Unable to insert data');
     console.log(`Data Inserted : ${JSON.stringify(result.ops,undefined,2)}`);
   })
   db.close();
});
