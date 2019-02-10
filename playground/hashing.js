const bcrypt = require('bcryptjs');

const password='MyNameIsVisheshPandit@112'

 bcrypt.genSalt(10,(error,salt)=>{
    bcrypt.hash(password,salt,(error,hash)=>{
        console.log('Hash is ',hash);
    });
 });
 const hashedPassword='$22a$10$GdAu48p8mZskHORAYvIgtexy7K9ngva3JPBM5sLIryGRCg6lJ/9We';

 bcrypt.compare(password,hashedPassword,(error,result)=>{
   console.log(result);
 });

// const {SHA256}= require('crypto-js');
// const jwt = require('jsonwebtoken');
//
//  var data={
//    id:10
//  };
//
//  var token=jwt.sign(data,'123abd');
//  console.log(token.toString());
//
// var decoded=jwt.verify(token,'123abd');
// console.log(decoded);
//
// var message='I am is Vishesh';
// var hash=SHA256(message).toString();
//
// console.log(`Message  is ${message}`);
// console.log(`Hash is ${hash}`);
//
// var data={
//   id:4
// }
//
// var token={
//   data,
//   hash:SHA256(JSON.stringify(data)+'heythisisMySalt').toString()
// }
//
// token.data=5;
// token.hash=SHA256(JSON.stringify(data)).toString();
//
// var hashValue=SHA256(JSON.stringify(data)+'heythisisMySalt').toString();
//
//
// if(hashValue === token.hash){
//   console.log('User Verified');
// }
// else {
//   console.log('Don\'t trust user isn\'t valid');
// }
