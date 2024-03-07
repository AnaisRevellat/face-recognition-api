const express = require("express");

const app = express();
const port = 3500;

//parser
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
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
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

  //to avoid a long loading it is important herer not to forget to return and have the response
  res.json(database.users[database.users.length - 1]);
});

//get the profile for the homepage
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

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
