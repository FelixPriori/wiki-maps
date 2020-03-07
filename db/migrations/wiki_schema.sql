DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS points CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE users (id SERIAL PRIMARY KEY,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
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
                     map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
                     );

CREATE TABLE favourites (id SERIAL PRIMARY KEY,
                        map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
                        contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE
                        );

CREATE TABLE contributions (id SERIAL PRIMARY KEY,
                           contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                           map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE 
                           );