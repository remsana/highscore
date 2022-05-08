var express = require('express');
var router = express.Router();

// GET http://localhost:3000/search?q=tetris
router.get('/', async function (req, res) {
   const searchTerm = req.query.q;

  const db = req.app.locals.db;

  // const games = req.app.locals.games;
  const sql = `
    SELECT id,
           name,
           EXTRACT(YEAR FROM launch_year) as year,
           game_type,
           description,
           image_url,
           url_slug
      FROM games
     WHERE name ILIKE '%' || $1 || '%'
  `;

  const result = await db.query(sql, [searchTerm]);

  res.render('search', {
    title: 'Sökresultat',
    games: result.rows,
    searchTerm
  });
});

module.exports = router;
