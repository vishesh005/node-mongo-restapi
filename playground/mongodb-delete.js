const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
   return console.log('Unable to connect to MongoDB server');
   //
   // db.collection('Todos').deleteMany({task:"Eat Breakfast"}).then((result)=>{
   //    console.log(result);
   // },(err)=>{
   //    console.log(`Error during deleting notes`);
   // });


      // db.collection('Todos').deleteOne({task:"Eat Lunch"}).then((result)=>{
      //    console.log(result);
      //    db.close();
      // },(err)=>{
      //    console.log(`Error during deleting notes`);
      // });

      db.collection('Todos').findOneAndDelete({task:"Eat Breakfast"}).then((result)=>{
         console.log(result);
         db.close();
      },(err)=>{
         console.log(`Error during deleting notes`);
      });
  // db.close();
});
