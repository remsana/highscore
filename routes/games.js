var express = require("express");
var router = express.Router();

// http://localhost:3000/games/uri:segment
router.get("/:urlSlug", async function (req, res) {
const urlSlug = req.params.urlSlug;
//   const games = req.app.locals.games;
//   const game = games.find(game => game.url_slug == urlSlug);

  const db = req.app.locals.db;
  
  const sql = `
    SELECT id,
           name,
           EXTRACT(YEAR FROM launch_year),
           game_type,
           description,
           image_url,
           url_slug
      FROM games
     WHERE url_slug = $1
  `;

  const result = await db.query(sql, [urlSlug]);
  const game = result.rows[0];


  res.render("games/details", 
  { title: game.name, 
    game });
});

router.get("/", function (req, res) {        
      res.render("games/index", 
      { title: "Highscore"
      });
    });

module.exports = router;
