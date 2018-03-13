const seeder  = require('knex-csv-seeder');

exports.seed = seeder.default({
  table: 'projects',
  file: 'db/csv_files/projects.csv'
});
