/* controllers/todos.js
  This file has all the todo-related (eg, the only) route handlers for our
  application. Note that the order of the routes matters. Had I defined the more
  generic routes (eg, "/") before the more specific ones (eg, "/completed"), I'd
  have gotten unexpected behavior from my queries.
*/

// imported so that we can createa router later.
const express = require("express");
// we attach handlers to this router instead of app so that we can keep them
// separate
const todos = express.Router();
// our controllers map user interactions with our database, so we import the models here instead of in index.js
const models = require("../models");
// needed to do complex queries with sequelize
const sequelize = require("sequelize");

/* HTTP Verbs vs Persistent Storage Operations
    +========+===================+
    | HTTP   | SQL               |
    +========+===================+
    | POST   | Create            |
    | GET    | Read              |
    | PUT    | Update (complete) |
    | PATCH  | Update (partial)  |
    | DELETE | Delete            |
    +--------+-------------------+
*/

// return an array of all completed todos
todos.get("/complete", (req, res) => {
  models.Todo.findAll({
    where: {
      complete: true
    }
  // we use res.json instead of res.send to guarantee that content is returned
  // as JSON instead of plain text
  }).then(todos => res.json(todos));
});

// return an array of all incomplete todos
todos.get("/incomplete", (req, res) => {
  models.Todo.findAll({
    where: {
      complete: false
    }
  }).then(function(todos) {
    res.json(todos);
  });
});

// update a todo by id
todos.patch("/:id", (req, res) => {
    // The request body will tell the server which fields to update
    models.Todo.update(req.body, {
        where: {
          id: req.params.id
        }
    // the update method on a model returns an array of ids for the todos which
    // were effected rather than the entire todo objects
    }).then(ids => res.json(ids));
});

// get a todo with a matching id
todos.get("/:id", (req,res) => {
  models.Todo.findById(req.params.id).then(todo => res.json(todo));
});

// get all todos; if a length query parameter (?length=5) is passed, return only
// those todos whose description length matches the query parameter exactly
todos.get("/", (req, res) => {
  const length = Number(req.query.length);
  /* reminder: ternary expressions are short-hand for if:
    let result;
    if(expression) {
      result = doSomething();
    else {
      result = doSomethingElse();
    }

    Is equivalent to:
      const result = expression ? doSomething() : doSomethingElse();
  */

  // here, if we didn't specify a length query parameter, we want to use an empty query ({}) so that we get back *all* todos, otherwise, we use a complex query expression to get descriptions of a specific length
  const query = length ? {
    where: sequelize.where(
      sequelize.fn("char_length", sequelize.col("description")),
      length
    )
  } : {};
  models.Todo.findAll(query).then(todos => res.send(todos));
});

// create a todo which isn't complete by default; a later migration might set
// complete to false by default so that this code isn't so redundant
todos.post("/", (req, res) => {
  models.Todo.create({
    description: req.body.description,
    complete: false
  }).then(todo => res.json(todo));
});

// export our routes so that we can use them in index.js
module.exports = todos;
