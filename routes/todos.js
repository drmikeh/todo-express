var express = require('express');
var router = express.Router();

var todos = [
  { _id: 0, title: 'Groceries', completed: false },
  { _id: 1, title: 'Learn Mongoose', completed: true }
];

// INDEX
router.get('/', function(req, res) {
  res.render('todos/index', { todos: todos });
});

// NEW
router.get('/new', function(req, res) {
  res.render('todos/new');
});

// SHOW
router.get('/:id', function(req, res) {
  var todo = todos[Number(req.params.id)];
  res.render('todos/show', { todo: todo });
});

// EDIT
router.get('/:id/edit', function(req, res) {
  res.render('todos/edit');
});

// CREATE
router.post('/', function(req, res) {
  res.send('CREATE:');
});

// UPDATE
router.put('/:id', function(req, res) {
  res.send('UPDATE: ' + req.params.id);
});

// DESTROY
router.delete('/:id', function(req, res) {
  res.send('DESTROY: ' + req.params.id);
});

module.exports = router;
