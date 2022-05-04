var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//dependencies - expresslayout, pg admin
var expressLayouts = require("express-ejs-layouts");
const { Pool } = require("pg");

var indexRouter = require("./routes/index");
var searchRouter = require("./routes/search");
var gamesRouter = require("./routes/games");

var app = express();

//to communicate with postgres
app.locals.db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "secretpassword",
  database: "highscore"  
});

// app.locals.games = [
//   {
//     id: 1,
//     name: "Tetris",
//     launch_year: 1982,
//     game_type: "puzzle",
//     description: "Lorem Ipsum dolor",
//     image_url: "https://via.placeholder.com/80x80.png?text=Tetris",
//     url_slug: "tetris",
//   },
//   {
//     id: 2,
//     name: "Pacman",
//     launch_year: 1981,
//     game_type: "fight",
//     description: "Lorem Ipsum dolor. Lorem ipsum dolor.",
//     image_url: "https://via.placeholder.com/80x80.png?text=Pacman",
//     url_slug: "pacman",
//   },
//   {
//     id: 3,
//     name: "Donkey Kong",
//     launch_year: 2000,
//     game_type: "Lorem",
//     description: "Lorem Ipsum dolor. Lorem ipsum dolor.",
//     image_url: "https://via.placeholder.com/80x80.png?text=DonkeyKong",
//     url_slug: "donkey_kong",
//   },
//   {
//     id: 3,
//     name: "Cabal",
//     launch_year: 1990,
//     game_type: "Ipsum",
//     description: "Lorem Ipsum dolor. Lorem ipsum dolor.",
//     image_url: "https://via.placeholder.com/80x80.png?text=cabal",
//     url_slug: "cabal",
//   },
//   {
//     id: 3,
//     name: "Asteroids",
//     launch_year: 2010,
//     game_type: "Dolor",
//     description: "Lorem Ipsum dolor. ",
//     image_url: "https://via.placeholder.com/80x80.png?text=asteroids",
//     url_slug: "asteroids",
//   },
// ];

app.locals.scores = [
  {
    id: 1,
    game_name: "Tetris",
    date: "2022-01-01",
    gamer: "John Doe",
    score: "2 200 200",
  },
  {
    id: 2,
    game_name: "Pac-Man",
    date: "2022-03-01",
    gamer: "Jane Doe",
    score: "200 200",
  },
  {
    id: 3,
    game_name: "Donkey Kong",
    date: "2022-02-05",
    gamer: "Jim Doe",
    score: "987 200",
  },
  {
    id: 4,
    game_name: "Cabal",
    date: "2022-02-18",
    gamer: "Jack Doe",
    score: "1 180 200",
  },
  {
    id: 5,
    game_name: "Asteroids",
    date: "2022-04-30",
    gamer: "Jake Doe",
    score: "3 987 200",
  }
];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting express layout
app.use(expressLayouts);
app.set("layout", "shared/layout");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/games", gamesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
