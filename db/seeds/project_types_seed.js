const seeder  = require('knex-csv-seeder');

exports.seed = seeder.default({
  table: 'project_types',
  file: 'db/csv_files/project_types.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  parser: {
    delimiter: '\n'
  }
});