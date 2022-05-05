var express = require("express");
var router = express.Router();

// http://localhost:3000/admin/games => leads to index.ejs
router.get("/", async function (req, res) {
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
    `;

  const result = await db.query(sql);
  const games = result.rows;

  res.render("admin/games/index", { title: "Admin", games });
});

// GET http://localhost:3000/admin/games/newgame => newgame.ejs
router.get("/newgame", async function (req, res) {
  res.render("admin/games/newgame", {
    title: "nytt spel - Admin",
  });
});

// GET http://localhost:3000/admin/games/newscore => newscore.ejs
router.get("/newscore", async function (req, res) {
  res.render("admin/games/newscore", {
    title: "ny score - Admin",
  });
});

module.exports = router;
