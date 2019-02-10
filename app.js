const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

//  ----------------------> CUSTOM IMPORTS <-------------------------//
const {mongoose} = require('./database/mongoose-db');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const todoRoute=require('./routes/todos')
//----------------------> CONFIGURATION <----------------------------//
const port=process.env.PORT || 3000;
const app=express();
app.use(bodyParser.json());
app.use('/todos',todoRoute);



app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
});

module.exports = {app};
