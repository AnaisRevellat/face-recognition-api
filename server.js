const express = require("express");

const app = express();
const port = 3500;

app.get("/", (req, res) => {
  res.send("Hello World! Port is okay");
});

app.post("/signin", (req, res) => {
  res.json("signin");
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
