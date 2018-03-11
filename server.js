require('dotenv').config();

const PORT        = process.env.PORT || 3001;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
// import seeder from 'knex-csv-seeder';
const seeder = require('knex-csv-seeder');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
// app.use('/api/users', usersRoutes(knex));

// Home page
app.get('/api', (req, res) => {
  console.log('hello world');
  res.json({ time: "today" });
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});