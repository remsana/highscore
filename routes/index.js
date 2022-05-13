var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {

  const db = req.app.locals.db; 
  
  const sql = `
  SELECT
  DISTINCT ON (title) title,
    score, 
    player,
    TO_CHAR(score_date,'YYYY-MM-DD') score_date,
    url_slug
  FROM
   scores s
  INNER JOIN games g
  ON s.game_id = g.id
  ORDER BY
    title, score DESC
  `;

  const result = await db.query(sql);

  const scores = result.rows;  

  res.render("index", 
  { title: "Highscore", 
  scores});
});

module.exports = router;
