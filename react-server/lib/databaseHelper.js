require('dotenv').config();

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
});


function getBuildingById (projectId, callback) {
  knex('projects')
  .join('owner_types', 'projects.owner_type_id', '=', 'owner_types.id')
  .join('certification_levels', 'projects.certification_level_id', '=', 'certification_levels.id')
  .join('rating_systems', 'projects.rating_system_id', '=', 'rating_systems.id')
  .join('project_types', 'projects.project_type_id', '=', 'project_types.id')
  .select('projects.id', 'projects.number', 'projects.name', 'projects.reg_date',
          'projects.cert_date', 'projects.address', 'projects.city', 'projects.province',
          'projects.size', 'project_types.type', 'owner_types.type', 'certification_levels.level',
          'rating_systems.rating_system', 'rating_systems.version')
  .where('projects.id', projectId)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    callback(rows);
  });
}

function getBuildings (callback) {
  knex('projects')
  .join('owner_types', 'projects.owner_type_id', '=', 'owner_types.id')
  .join('certification_levels', 'projects.certification_level_id', '=', 'certification_levels.id')
  .join('rating_systems', 'projects.rating_system_id', '=', 'rating_systems.id')
  .join('project_types', 'projects.project_type_id', '=', 'project_types.id')
  .select('projects.id', 'projects.number', 'projects.name', 'projects.reg_date',
          'projects.cert_date', 'projects.address', 'projects.city', 'projects.province',
          'projects.size', 'project_types.type', 'owner_types.type', 'certification_levels.level',
          'rating_systems.rating_system', 'rating_systems.version')
  .asCallback(function (err, rows) {
    if (err) return console.error(err);
    callback(rows);
  });

}

function insertProject (number, name, reg_date, cert_date, address, city, province,
                        size, project_type_id, owner_type_id, certification_level_id,
                        rating_system_id, sendResponse) {
  knex('projects')
  .insert({
    number: `${number}`,
    name: `${name}`,
    reg_date: `${reg_date}`,
    cert_date: `${cert_date}`,
    address: `${address}`,
    city: `${city}`,
    province: `${province}`,
    size: `${size}`,
    project_type_id: `${project_type_id}`,
    owner_type_id: `${owner_type_id}`,
    certification_level_id: `${certification_level_id}`,
    rating_system_id: `${rating_system_id}`,
  })
  .asCallback(function (err) {
      if (err) return console.error(err);
      sendResponse('Inserted row!!');
  })
}


// testing for just the file - remove when we export the functions

// getBuildingById(1, (rows) => {
//    console.log('rows returned: ', rows);
// });

// getBuildings((rows) => {
//    console.log('rows returned: ', rows);
// });

insertProject(1234, 'Test Project', '2018-01-01', '2017-12-04', '654 7 Ave SW', 'Calgary',
                    'Alberta', '3333', 1, 5, 4, 2, (success) => {
   console.log(success);
});


