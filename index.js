// Imports Express
const express = require('express');

// Express Initialization
const server = express();
server.use(express.json());

// Rudimentary Persistence
  const users = [];

// Port Listen
server.listen(3000);

// Routes
// List all Users
server.get('/users', (req, res) => {
  return res.json(users);
})

// List :index user
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

// Create new User
server.post('/users', checkUserExists, (req, res) => {
  const {name} = req.body;
  users.push(name);
  return res.json(users);
})

// Modifies User
server.put('/users/:index', checkUserExists, checkUserInArray, (req,res) => {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;

  return res.json(users);
})

// Deletes User
server.delete('/users/:index', (req, res) => {
  const {index} = req.params;
  users.splice(index, 1);

  return res.status('200').send('Excluido com sucesso');
})

// Middlewares
// Global
server.use((req,res,next) => {
  console.time('Request');
  console.log(`Function: ${req.method}; URL: ${req.url}`);
  next();
  console.log('Finished');
  console.timeEnd('Request');
})

// Local
function checkUserExists (req,res,next) {
  if(!req.body.name){
    return res.status(400).json({error: 'user name is required'});
  }

  return next();
}

function checkUserInArray (req,res,next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({error: 'geek does not exists'});
  }

  req.user = user;
  return next();
}