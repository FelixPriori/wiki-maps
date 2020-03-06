DELETE TABLE IF EXISTS users CASCADE;
DELETE TABLE IF EXISTS maps CASCADE;
DELETE TABLE IF EXISTS points CASCADE;
DELETE TABLE IF EXISTS favourites CASCADE;
DELETE TABLE IF EXISTS contributions CASCADE;

CREATE TABLE users (id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    avatar VARCHAR(255) NOT NULL,
                    location VARCHAR(255) NOT NULL
                    );

CREATE TABLE maps (id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       latitude INTEGER NOT NULL,
                       longitude INTEGER NOT NULL,
                       zoom INTEGER NOT NULL
                       );

CREATE TABLE points (id SERIAL PRIMARY KEY,
                     name VARCHAR(255) NOT NULL,
                     description TEXT,
                     image VARCHAR(255),
                     latitude INTEGER NOT NULL,
                     longitude INTEGER NOT NULL,
                     map_id INTEGER REFERENCES maps(id) DELETE ON CASCADE
                     );

CREATE TABLE favourites (id SERIAL PRIMARY KEY,
                        map_id INTEGER REFERENCES maps(id) DELETE ON CASCADE,
                        contributor_id INTEGER REFERENCES users(id) DELETE ON CASCADE
                        );

CREATE TABLE contributions (id SERIAL PRIMARY KEY,
                           contributor_id INTEGER REFERENCES user(id) DELETE ON CASCADE,
                           map_id INTEGER REFERENCES maps(id) DELETE ON CASCADE 
                           );