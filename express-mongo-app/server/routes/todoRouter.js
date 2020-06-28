var express = require('express')
var router = express.Router()
const todoLib = require('../lib/todoLib');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', todoLib.getAllToDos);
router.post('/', todoLib.createToDo);
router.delete('/:todo_id', todoLib.deleteToDo);

module.exports = router