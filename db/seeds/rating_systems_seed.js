const seeder  = require('knex-csv-seeder');

exports.seed = seeder.default({
  table: 'rating_systems',
  file: 'db/csv_files/rating_systems.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  // parser: {
  //   delimiter: ',',
  //   escape: '\\'
  // }
});