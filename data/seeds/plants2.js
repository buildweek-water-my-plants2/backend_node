exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("plants").insert([
        {
          id: 1, 
          nickname: "jodie",
          species: "snake",
          h2ofrequency: "once a week",
          user_id: 1
    
        },
        {
          id: 2, 
          nickname: "casey",
          species: "snake",
          h2ofrequency: "once a week",
          user_id: 1
     

        },
        {
          id: 3, 
          nickname: "thomas",
          species: "snake",
          h2ofrequency: "once a week",
          user_id: 1

        },
      ]);
    });
};

