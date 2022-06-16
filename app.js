const express = require('express')
const cors = require("cors")
const db = require("./models");
const router = require('./routes/routes');
var bcrypt = require("bcryptjs");

const app = express()
const port = 3000
require('dotenv').config();

const User = db.users;
let corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

db.sequelize.sync().then(() => {
    const user = {
      name: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("12345", 8),
      role: "admin"
    }
    
    User.create(user)
      .then(data => {
        // console.log("Admin created");
      })
      .catch(err => {
        // console.log(err);
      });
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;