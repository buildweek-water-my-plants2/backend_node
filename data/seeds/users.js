
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user', password: 'password', phoneNumber: 111111111111111},
        {id: 2, username: 'user2', password: 'password', phoneNumber: 111111111111111},
        {id: 3, username: 'user3', password: 'password', phoneNumber: 111111111111111}
      ]);
    });
};


