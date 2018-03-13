
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('owner_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('owner_types').insert([
        {id: 1, type: 'Commercial'},
        {id: 2, type: 'Government - Federal'},
        {id: 3, type: 'Government - Local'},
        {id: 4, type: 'Government - Provincial / Territorial'},
        {id: 5, type: 'Nonprofit'},
        {id: 6, type: 'Other'},
        {id: 7, type: 'Public Health'},
        {id: 8, type: 'School Board'},
        {id: 9, type: 'University / College'},
      ]);
    });
};
