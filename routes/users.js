var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getItems(req, res) {
  db("SELECT * FROM users ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

router.get("/", function(req, res, next) {
  getItems(req, res);
});

router.get("/cereal", function(req, res, next) {
  db("SELECT * FROM cereal;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
router.get("/gender", function(req, res, next) {
  db("SELECT * FROM gender;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:cereal_id", function(req, res, next) {
  if (!Number.isInteger(parseInt(req.params.cereal_id))) {
    res.status(400).send("Id is a number");
  }
    db(`SELECT * FROM users WHERE cereal_id=${req.params.cereal_id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send(results.error);
      } else {
        res.send(results.data);
      }
    })
    .catch(err => res.status(500).send(err));
});
module.exports = router;
