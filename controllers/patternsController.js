const db = require("../models");

// Defining methods for the PatternsController
module.exports = {
  findAll: function(req, res) {
    db.Pattern
      .find(req.query)
      .sort({ id: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Pattern
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  find: function (req, res) {
    db.Pattern
      .find({
        title: { $regex: new RegExp(req.query.q, 'i')}
      })
      .then(patterns => res.json(patterns))
      .catch(err => res.status(422).end());
  },
  create: function(req, res) {
    db.Pattern
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Pattern
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Pattern
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
