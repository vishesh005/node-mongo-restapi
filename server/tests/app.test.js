const expect = require('expect');
const request = require('supertest');
const {app} =require('./../app');
const {Todo} =require('./../models/todo');

const dummyTodos=[
  {
    text:'hey there '
  },
  {
    text:'hey there again'
  },
  {
    text:'bye there '
  }
];

beforeEach((done)=>{
 Todo.remove({}).then(()=>{
    return Todo.insertMany(dummyTodos);
   }).then(()=>done());
});

describe('Post /todos',()=>{
it('should create new todos',(done)=>{
  var text="Test todos text";
  request(app)
  .post('/todos')
  .send({text})
  .expect(200)
  .expect((res)=>{
   expect(res.body.text).toBe(text);
 })
 .end((err,res)=>{
      if(err){
       return done(err);
      }
      Todo.find().then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         return done();
      }).catch((err)=>done(err));
   });
});


it('should not create todos with invalid data',(done)=>{
   request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end(done);
});

});

describe('GET /todos',()=>{
   it('should get all todos',(done)=>{
       request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(3);
        })
        .end(done);
   });
});
