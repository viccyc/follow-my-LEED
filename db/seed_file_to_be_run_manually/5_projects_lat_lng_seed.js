require('dotenv').config();

const knexConfig  = require('../../knexfile');
const ENV         = process.env.ENV || 'development';
const knex        = require('knex')(knexConfig[ENV]);
const seeder  = require('knex-csv-seeder');
const axios = require('axios');

// Retrieve the lat and lng from Google Maps API
// Insert into 'projects' table
const API_KEY = 'AIzaSyCVUNahj_Lx06vet-sGaPLHBs0svgXwX98';

knex('projects')
  .select('id', 'address', 'city', 'province')
  .returning()
  .then(data => {
    data.forEach(project => {
      let address = (`${project.address}, ${project.city}, ${project.province}`).split(' ').join('+');
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(response => {
          let lat = response.data.results[0].geometry.location.lat;
          let lng = response.data.results[0].geometry.location.lng;
          knex('projects')
            .where('id', project.id)
            .update({ lat: lat, lng: lng })
            .returning('*')
            .then(data => console.log(data));
        })
        .catch(error => {
          console.log(error);
        });
    });
  });