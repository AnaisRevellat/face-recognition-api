// const express = require("express");
// const bcrypt = require("bcrypt-nodejs");
// const cors = require("cors");
// const knex = require("knex");

import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

// const register = require("./controllers/register");
// const signin = require("./controllers/signin");
// const profile = require("./controllers/profile");
// const image = require("./controllers/image");

import * as register from "./controllers/register.js";
import * as signin from "./controllers/signin.js";
import * as profile from "./controllers/profile.js";
import * as image from "./controllers/image.js";

/*knex to link the db*/

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", 
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

app.get("/", (req, res) => {
  res.send("home success");
});

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt);});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
}); //dependencies injections

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);  
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);  
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});