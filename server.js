const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
//knex to link the db

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //=== localhost
    port: 5432,
    user: "postgres",
    password: "gianni777",
    database: "recognition_app",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

//to verify if the connection to the db is okay
console.log(db.select("*").from("users"));

const app = express();
const port = 3500;

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "johnhowieson@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Velka",
      email: "velkawolf@gmail.com",
      password: "matcha",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "741",
      hash: "",
      email: "johnhowieson@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    //here a transaction is important to ensure that the process is okay and in case of failure we go back
  });
  db("users")
    .returning("*") //in the knex docs returning feature allows us to easily send the response
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
});

//get the profile for the homepage
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("error getting user");
      }
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    });
  // .catch((err) => res.status(400).json("unable to get count"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//bcrypt
// bcrypt.hash("bacon", null, null, function (err, hash) {

// });
