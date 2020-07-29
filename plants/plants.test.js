const db = require("../data/dbConfig");
const Users = require("../users/users-model");
const supertest = require("supertest");
const server = require("../api/server");
const Plants = require("./plants-model");

let token;

beforeAll((done) => {
  supertest(server)
    .post("/api/auth/register")
    .send({
      username: "user",
      password: "password",
      phoneNumber: 111111111111111,
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

beforeAll((done) => {
  supertest(server)
    .post("/api/auth/login")
    .send({
      username: "user",
      password: "password",
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});


describe("get plants for a specific user", () => {
  // token not being sent - should respond with a 401
  test("It should require authorization", () => {
    return supertest(server)
      .get("/api/plants/user/1")
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test("It gets plants", () => {
    return supertest(server)
      .get("/api/plants/user/1")
      .set("Authorization", token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  describe("can add a plant", () => {
    // token not being sent - should respond with a 401
    test("It should require authorization", () => {
      return supertest(server)
        .get("/api/plants/user/1")
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });
    // send the token - should respond with a 200
    test("It adds a new plant", () => {
      return supertest(server)
        .post("/api/plants/user/1")
        .set("Authorization", token)
        .send({
          nickname: "jodie",
          species: "snake",
          h2ofrequency: "once a week",
        })
        .then((response) => {
          expect(response.statusCode).toBe(201);
        });
    });

    describe("can update a plant", () => {

      test("updates plant", () => {
        return supertest(server)
          .put("/api/plants/1")
          .set("Authorization", token)
          .send({
            nickname: "UPDATED",
            species: "snake",
            h2ofrequency: "once a week",
          })
          .then((response) => {
            expect(response.statusCode).toBe(200);
          });
      });
    });
  });
});

// await Plants.add(
//   {
//     nickname: "jodie",
//     species: "snake",
//     h2ofrequency: "once a week",
//   },
//   1
// );

// await Plants.update(1, {
//   nickname: "UPDATED",
//   species: "snake",
//   h2ofrequency: "once a week",
// });

// const plants = await db("plants");

// expect(plants[0].nickname).toBe("UPDATED");


// beforeEach(async () => {
//     return supertest(server)
//     .post("/api/plants/user/1")
//     .set("Authorization", token)
//     .send({
//       nickname: "jodie",
//       species: "snake",
//       h2ofrequency: "once a week",
//     })
//   });