
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('certification_levels').del()
    .then(function () {
      // Inserts seed entries
      return knex('certification_levels').insert([
        {id: 1, level: 'Certified'},
        {id: 2, level: 'Silver'},
        {id: 3, level: 'Gold'},
        {id: 4, level: 'Platinum'}
      ]);
    });
};
