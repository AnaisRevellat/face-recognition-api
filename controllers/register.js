const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    //here a transaction is important to ensure that the process is okay and in case of failure we go back
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*") //in the knex docs returning feature allows us to easily send the response
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister
};