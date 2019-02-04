const expect = require('expect');
const request = require('supertest');
const {app} =require('./../app');
const {Todos} = require('./../models/todo');

beforeEach((done)=>{
   Todo.remove({}).then(()=>done());
});

describe('Post /todos',()=>{
it('should create new todos',(done)=>{
  var text="Test todos text";
  request(app)
  .post('/todos')
  .send({text})
  .expect(200)
  .expect((res)=>{
   expect(res.body.text).toBe(text)
   .end((err,res)=>{
      if(err)
       return done(err);
      Todo.find().then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
      }).catch((err)=>{
        done(err);
      });

   });

 });
});

});
