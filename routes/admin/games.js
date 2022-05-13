var express = require("express");
var router = express.Router();

// GET http://localhost:3000/admin/games => leads to index.ejs
//Admin home page
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
    SELECT id,
           name,
           EXTRACT(YEAR FROM launch_year) as year,
           game_type           
    FROM games
    `;

  const result = await db.query(sql);
  const games = result.rows;

  res.render("admin/games/index", { title: "Admin", games });
});

// GET http://localhost:3000/admin/games/newgame => leads to newgame.ejs
//Admin new game page
router.get("/newgame", async function (req, res) {
  res.render("admin/games/newgame", {
    title: "Admin - Nytt Spel",
  });
});

// POST http://localhost:3000/admin/games/newgame Once the button is clicked the page redirects to /admin/games
//Admin new gamepage then redirects to admin home page
router.post("/newgame", async function (req, res) {
  const db = req.app.locals.db;

  const { name, description, image_url, game_type, launch_year } = req.body;

  const newGame = {
    name,
    description,
    image_url,
    game_type,
    launch_year,
    url_slug: generateURLSlug(name),
  };

  await saveGame(newGame, db);

  res.redirect("/admin/games");
});

// GET http://localhost:3000/admin/games/newscore => newscore.ejs
// Admin new score page
router.get("/newscore", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
   SELECT DISTINCT 
       name
   FROM games
   ORDER BY 
       name ASC
      `;

  const result = await db.query(sql);

  const games = result.rows;

  res.render("admin/games/newscore", {
    title: "Admin - Nytt Score",
    games,
  });
});

// POST http://localhost:3000/admin/games/newscore => Once the button is clicked the page redirects to /admin/games
//Admin new score page then redirects to admin home page
router.post("/newscore", async function (req, res) {

  const db = req.app.locals.db;
  const { score_date, player, score, name } = req.body;

  const sql = `
  select id 
    from games 
  where name = $1
      `;

  const result = await db.query(sql, [name]);
  const game_id = result.rows[0].id;

  const newScore = {
    score_date,
    player,
    score,
    game_id
  };

  await saveScore(newScore, db);

  res.redirect("/admin/games");
});

//functions

//save the new game information
function saveGame(newGame, db) {
  const sql = `
INSERT INTO games (
  name,
  description,
  launch_year,
  game_type,
  image_url,
  url_slug
) VALUES ($1, $2, $3, $4, $5, $6)`;

  const result = db.query(sql, [
    newGame.name,
    newGame.description,
    newGame.launch_year,
    newGame.game_type,
    newGame.image_url,
    newGame.url_slug,
  ]);
}

//TODO: fix the game_id For now it is hard coded

//save the new scores
function saveScore(newScore, db) {
  const sql = `
  INSERT INTO scores (
    game_id, 
    score_date, 
    player, 
    score
  ) VALUES ($1, $2, $3, $4)`;

  const result = db.query(sql, [
    newScore.game_id,
    newScore.score_date,
    newScore.player,
    newScore.score
  ]);
}

//For generating URL slug programatically
function generateURLSlug(name) {
  return name.replace(/-/g, "").replace(/ /g, "-").toLowerCase();
}

module.exports = router;
