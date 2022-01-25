-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP IF TABLE EXITSTS characters;

CREATE TABLE characters (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL, 
  birthday TEXT NOT NULL,
  address TEXT NOT NULL,
  elligible TEXT NOT NULL,
)
