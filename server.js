const express = require("express");

const app = express();
const port = 3500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

//get the profile for the homepage
app.get("/profil/:id", (req, res) => {
  const { id } = req.params;
  database.users.forEach((user) => {
    if (user.id === id) {
      res.json(user);
    } else {
      res.status(404).json("no such user");
    }
  });
});

app.post("/image", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
first draft for the project and needed endpoints

/signin => POST response with success/fail
/register => POST user
/profile/:userId => GET = user (with his informations)
/image => PUT (updating the score) 


 */
