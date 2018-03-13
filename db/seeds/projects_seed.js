const seeder  = require('knex-csv-seeder');
// import seeder from 'knex-csv-seeder';

exports.seed = seeder.default({
  table: 'projects',
  file: 'db/csv_files/projects.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  parser: {
    delimiter: '\n',
  //   quote: '"',
  // //   escape: '\\'
  }
});