var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

// var TodoController = require('../controllers/todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
router.get('/', function(req, res, next) {
  Todo.find({}, function(err, todos) {
    if (err) return next(err);
    res.render('todos/index', { todos: todos });
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var todo = {
    title: '',
    completed: false
  };
  res.render('todos/new', { todo: todo, checked: '' });
});

// SHOW
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    var checked = todo.completed ? 'checked' : '';
    res.render('todos/show', { todo: todo, checked: checked } );
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    var checked = todo.completed ? 'checked' : '';
    res.render('todos/edit', { todo: todo, checked: checked } );
  });
});

// CREATE
router.post('/', function(req, res, next) {
  var todo = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  Todo.create(todo, function(err, saved) {
    if (err) return next(err);
    res.redirect('/todos');
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) return next(err);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    else {
      todo.title = req.body.title;
      todo.completed = req.body.completed ? true : false;
      todo.save(function(err) {
        if (err) return next(err);
        res.redirect('/todos');
      });
    }
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function(err, todo) {
    if (err) return next(err);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.redirect('/todos');
  });
});

module.exports = router;
