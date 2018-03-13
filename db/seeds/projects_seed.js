// const knexConfig  = require('../../knexfile');
// const knex        = require('knex')(knexConfig[ENV]);
// const knexLogger  = require('knex-logger');
// const morgan      = require('morgan');
const seeder  = require('knex-csv-seeder');

exports.seed = seeder.default({
  table: 'projects',
  file: 'db/csv_files/projects.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  parser: {
    delimiter: '\n'
  //   escape: '\\'
  }
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

// // Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

// // Retrieve the lat and lng from Google Maps API
// // Insert into 'projects' table
// const API_KEY = 'AIzaSyCVUNahj_Lx06vet-sGaPLHBs0svgXwX98';
// const axios = require('axios');

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('projects').del()
//     .then(() => {
//       // Insert seed entries
//       return seeder.default({
//       table: 'project_types',
//       file: 'db/csv_files/project_types.csv'
//       });
//     }).then(function () {
//       return knex('projects')
//         .select('id', 'address', 'city', 'province')
//         .returning()
//         .then(data => {
//           data.forEach(project => {
//             console.log(project);
//             console.log(project.id);
//             let address = (`${project.address}, ${project.city}, ${project.province}`).split(' ').join('+');
//             // console.log(address);
//             axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
//               .then(response => {
//                 let lat = response.data.results[0].geometry.location.lat;
//                 let lng = response.data.results[0].geometry.location.lng;
//                 console.log(lat, lng, project.id);
//                 knex('projects')
//                   .where('id', project.id)
//                   .update({ lat: lat, lng: lng })
//                   .returning('*')
//                   .then(data => console.log(data));
//               })
//               .catch(error => {
//                 console.log(error);
//               });
//           });
//         });
//     });
// };