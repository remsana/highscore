var express = require("express");
var router = express.Router();

// http://localhost:3000/games/uri:segment
router.get("/:urlSlug", async function (req, res) {
  const urlSlug = req.params.urlSlug;

  const db = req.app.locals.db;

  const sql = `
  SELECT   
    name,
    EXTRACT(YEAR FROM launch_year) as year,
    game_type,
    description,
    image_url,
    url_slug,
    player,
    TO_CHAR(score_date,'YYYY-MM-DD') score_date,
    score
  FROM games g
  LEFT JOIN scores s
  ON g.id = s.game_id
  WHERE url_slug = $1
  ORDER BY score DESC
	LIMIT 10`;

  const result = await db.query(sql, [urlSlug]);
  const game = result.rows[0];
  const games = result.rows;

  res.render("games/details", { title: game.name, games, game });
});

router.get("/", function (req, res) {
  res.render("games/index", { title: "Highscore" });
});

module.exports = router;
