var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  console.log('TODOS:index');
  var todos = global.currentUser.todos;
  res.render('todos/index', { todos: todos, message: req.flash() })
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var todo = {
    title: '',
    completed: false
  };
  res.render('todos/new', { todo: todo, checked: '', message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  var checked = todo.completed ? 'checked' : '';
  res.render('todos/show', { todo: todo, checked: checked, message: req.flash() } );
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  var checked = todo.completed ? 'checked' : '';
  res.render('todos/edit', { todo: todo, checked: checked, message: req.flash() } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var todo = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  // Todo.create(todo, function(err, saved) {
  currentUser.todos.push(todo);
  currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/todos');
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  else {
    todo.title = req.body.title;
    todo.completed = req.body.completed ? true : false;
    currentUser.save(function(err) {
      if (err) return next(err);
      res.redirect('/todos');
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.todos.indexOf(todo);
  currentUser.todos.splice(index, 1);
  currentUser.save(function(err) {
    if (err) return next(err);
    res.redirect('/todos');
  });
});

module.exports = router;
