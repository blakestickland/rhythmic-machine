const router = require("express").Router();
const db = require("../models");

router.get("/patterns", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Pattern.find({
    patternName: { $regex: new RegExp(req.query.q, 'i')}
  })
    .then(patterns => res.json(patterns))
    .catch(err => res.status(422).end());
});

module.exports = router;
