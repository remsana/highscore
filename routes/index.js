var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  const scores = req.app.locals.scores;

  res.render("index", 
  { title: "Highscore", 
  scores });
});

module.exports = router;
