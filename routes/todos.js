var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

// var TodoController = require('../controllers/todo');

// INDEX
router.get('/', function(req, res) {
  Todo.find({}, function(err, todos) {
    res.render('todos/index', { todos: todos });
  });
});

// NEW
router.get('/new', function(req, res) {
  var todo = {
    title: '',
    completed: false
  };
  res.render('todos/new', { todo: todo, checked: '' });
});

// SHOW
router.get('/:id', function(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    var checked = todo.completed ? 'checked' : '';
    res.render('todos/show', { todo: todo, checked: checked } );
  });
});

// EDIT
router.get('/:id/edit', function(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    var checked = todo.completed ? 'checked' : '';
    res.render('todos/edit', { todo: todo, checked: checked } );
  });
});

// CREATE
router.post('/', function(req, res) {
  var todo = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  Todo.create(todo).then(function(saved) {
    res.redirect('/todos');
  });
});

// UPDATE
router.put('/:id', function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) console.log('ERROR:', err);
    else if (!todo) {
      return next(new Error('Could not find TODO Document'));
    }
    else {
      todo.title = req.body.title;
      todo.completed = req.body.completed || false;
      todo.save(function(err) {
        if (err) res.send('ERROR:', err);
        else console.log('UPDATED: ' + JSON.stringify(todo));
        res.redirect('/todos');
      });
    }
  });
});

// DESTROY
router.delete('/:id', function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err, todo) {
    res.redirect('/todos');
  });
});

module.exports = router;
