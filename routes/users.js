var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getUsers(req, res) {
  db("SELECT * FROM users ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

router.get("/", function(req, res, next) {
  getUsers(req, res);
});

router.get("/cereal", function(req, res, next) {
  db("SELECT * FROM cereal;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  db(`UPDATE users SET photo ='${req.body.photo}' WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        db("SELECT * FROM users ORDER BY id ASC;")
          .then(results => {
            res.send(results.data);
          })
          .catch(err => res.status(500).send(err));
      }
    })
    .catch(err => res.status(500).send(err));
});
router.put("/:cereal_id", (req, res) => {
  db(`UPDATE users SET cereal_id ='${req.body.photo}' WHERE id=${req.params.id};`)
  .then(result => {
    if(result.error) {
      res.status(404).send({error: result.error});
    } else {
      db("SELECT * FROM users ORDER BY id ASC;")
      .then(result => {
        res.send(result.data);
      })
      .catch(err => res.status(500).send(err));
  }
}) 
  .catch(err => res.status(500).send(err));
});

router.post("/", function(req, res) {
  db(`INSERT INTO users (name, cereal_id, city, photo, dob) VALUES ('${req.body.name}', ${req.body.cereal_id}, '${req.body.city}', '${req.body.photo}','${req.body.dob}');`)
    .then(result => {
      if(result.error) {
        res.status(404).send({error: result.error});
      } else {
        getUsers(req, res)
      }
    })
    .catch(err => res.status(500).send(err));
});

router.get("/cereal/:cereal_id", function(req, res, next) {
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
router.get("/:ids", function(req, res, next) {

  db(`SELECT * FROM users WHERE cereal_id IN (${req.params.ids});`)
  .then(results => {
    if (results.error) {
      res.status(404).send(results.error);
    } else {
      res.send(results.data);
    }
  })
  .catch(err => res.status(500).send(err));
});
router.delete("/:id", function(req, res) {
  if (!Number.isInteger(parseInt(req.params.id))) {
    res.status(400).send("Id is a number");
  }
  db(`DELETE FROM users WHERE id=${req.params.id}`)
    .then(results => {
      if (results.error) {
        return res.status(404).send({ error: results.error });
      } else {
        getUsers(req, res);
      }
    })
    .catch(err => res.status(500).send(err));
  //your code here
});
module.exports = router;
