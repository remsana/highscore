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
SELECT     id,
           name,
           EXTRACT(YEAR FROM launch_year),
           game_type,
           description,
           image_url,
           url_slug
      FROM games