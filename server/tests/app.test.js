const expect = require('expect');
const request = require('supertest');
const {app} =require('./../app');
const {Todo} =require('./../models/todo');
const {ObjectID} = require('mongodb');

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
 Todo.remove({}).then((result)=>{
    return Todo.insertMany(dummyTodos);
  })
  .then(()=>done())
  .catch((error)=>done(error));
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

   it('should get todos by id ',(done)=>{
     var id="5c586bcb0b9cf311fafb86b2";
       request(app)
        .get(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo._id).toBe('5c586bcb0b9cf311fafb86b2');
        })
        .end(done);
   });

   it('should 404 on  invalid todos by id ',(done)=>{
     var id=new ObjectID().toHexString();
       request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
   });
});
