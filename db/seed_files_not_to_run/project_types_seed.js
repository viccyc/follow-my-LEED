// const knexSeeder  = require('knex-csv-seeder');
import seeder from 'knex-csv-seeder';

exports.seed = seeder({
  table: 'project_types',
  file: '../csv_files/project_types.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  parser: {
    delimiter: ',',
    quote: '"',
  //   escape: '\\'
  }
});