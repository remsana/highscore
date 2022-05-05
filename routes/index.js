var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT date, 
         player,
         score,
         name,
         url_slug
  FROM scores s
  LEFT JOIN games g
  ON s.game_id = g.id     
  `;

  const result = await db.query(sql);
  const scores = result.rows;

  res.render("index", 
  { title: "Highscore", 
  scores});
});

module.exports = router;
