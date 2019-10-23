
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(() => knex('nannys').truncate())
    .then(() => knex('parents').truncate())
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'Password421'},
        {id: 2, username: 'user2', password: 'Password422'},
        {id: 3, username: 'user3', password: 'Password423'},
        {id: 4, username: 'user4', password: 'Password424'},
        {id: 5, username: 'user5', password: 'Password425'},
        {id: 6, username: 'user6', password: 'Password426'}
      ]);
    })
    .then(function () {
      return knex('nannys').insert([
        {id: 1, name: 'Ian', email: 'ian@email.com', zip_code: '34238', availability_start: 8, availability_end: 16, responded: false, user_id: 1},
        {id: 2, name: 'Samantha', email: 'samantha@email.com', zip_code: '34239', availability_start: 9, availability_end: 11, responded: false, user_id: 3},
        {id: 3, name: 'Kevin', email: 'kevin@email.com', zip_code: '34232', availability_start: 11, availability_end: 20, responded: false, user_id: 5}
      ])
    })
    .then(function () {
      return knex('parents').insert([
        {id: 1, name: 'Jordan', kids: '3', email: 'jordan@email.com', zip_code: '34231', selected: false, user_id: 2},
        {id: 2, name: 'Tyler', kids: '1', email: 'tyler@email.com', zip_code: '34231', selected: false, user_id: 4},
        {id: 3, name: 'Kayla', kids: '2', email: 'kayla@email.com', zip_code: '34240', selected: false, user_id: 6}
      ])
    })
};
