var db = require("../models");
var passport = require("../config/passport");


module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/home");
  });

  
  app.post("/api/users", function (req, res) {
    db.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email
    }).then(function () {
      res.redirect(307, "/login");
    });
  });


  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/todos", function (req, res) {
    db.Todo.findAll({
    }).then(function (dbTodo) {
      res.json(dbTodo);
    })
  })

  app.get("/api/todos/:id", function (req, res) {
    db.Todo.findOne({
      where: {
        id: req.params.id
      },
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });


  app.post("/api/todos", function (req, res) {
    db.Todo.create({
      task: req.body.task,
      completion: false
    }).then(function (dbTodo) {
      res.send(dbTodo);
    });
  });

  app.delete("/api/todos/:id", function (req, res) {
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });

  app.put("/api/todos", function (req, res) {
    db.Todo.update({
      complete: req.body.complete
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbTodo) {
        res.json(dbTodo);
      });
  });

  app.get("/api/budgets", function (req, res) {
    db.Budget.findAll({
    }).then(function (dbBudget) {
      res.json(dbBudget);
    })
  });

  app.get("/api/budgets/:id", function (req, res) {
    db.Budget.findOne({
      where: {
        id: req.params.id
      },
    }).then(function (dbBudget) {
      res.json(dbBudget);
    });
  });

  app.post("/api/budgets", function (req, res) {
    db.Budget.create({
      budgetSet: req.body.budgetSet,
      budgetAvail: req.body.budgetAvail
    }).then(function (dbBudget) {
      res.send(dbBudget);
    });
  });

  app.delete("/api/budgets/:id", function (req, res) {
    db.Budget.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbBudget) {
      res.json(dbBudget);
    });
  });



};