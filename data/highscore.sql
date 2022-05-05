-- creating a table for games
--i have made the nme unique so the url slug wont be the same.
CREATE TABLE games (
Id INTEGER GENERATED ALWAYS AS IDENTITY,
name VARCHAR (50) NOT NULL,
launch_year DATE NOT NULL,
game_type VARCHAR (50) NOT NULL,
description VARCHAR (250) NOT NULL,
image_url VARCHAR (250) NOT NULL,
url_slug VARCHAR (50) NOT NULL,
PRIMARY KEY (id),
UNIQUE (name)
);

--Inserting games 
--inserted 3 games to begin with

INSERT INTO games (name, launch_year, game_type, description, image_url, url_slug)
VALUES
('Tetris', '01-01-1984', 'Puzzle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'https://via.placeholder.com/80x80.png?text=Tetris','tetris'),
('Pac-Man', '01-01-1980', 'Arcade', 'Cras luctus sollicitudin justo eu accumsan. ', 'https://via.placeholder.com/80x80.png?text=Pac-man', 'pacman'),
('Cabal', '01-01-2005', 'Shooting', 'Praesent iaculis lorem purus, vitae pellentesque orci finibus.', 'https://via.placeholder.com/80x80.png?text=Cabal', 'cabal')


--the extract funcion has been used to convert the date to year.
--when using in views it must be thus referred to as game.extract and not game.launch_year
SELECT 
    id,
    name,
    EXTRACT(YEAR FROM launch_year),
    game_type,
    description,
    image_url,
    url_slug
 FROM games

 --creating a table fr scores

CREATE TABLE scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_name VARCHAR (50) NOT NULL,
    date DATE NOT NULL,
    player VARCHAR (50) NOT NULL,
    score INTEGER(50) NOT NULL,
    FOREIGN KEY (game_name)
    REFERENCES games (name),    
    PRIMARY KEY (id)
);

--inserting some scores

INSERT INTO scores (game_id, date, player, score)
VALUES
(1, '01-02-2022', 'Jon Snow', '205689'),
(1, '01-03-2022', 'Jane Patrick', '2056890'),
(1, '01-04-2022', 'Sheldon Cooper', '1205689'),
(2, '05-02-2022', 'John Doe', '2050689'),
(2, '01-05-2022', 'Jack and Jill', '35689'),
(2, '01-01-2022', 'Peppa Pig', '605689'),
(3, '01-04-2022', 'Jack Doe', '785689'),
(3, '03-03-2022', 'Jim Snow', '966689'),
(3, '04-04-2022', 'Jake Doe', '2582689')

