var bcrypt = require("bcryptjs");
const { tokenSign } = require('../helpers/generateToken')
const db = require("../models");
const { schemaRegister, schemaLogin, schemaUpdateUser } = require("../helpers/validator");

const User = db.users;


const createUser = async(req, res) => {
    // Validate request
    const { error } = schemaRegister.validate(req.body);
    if( error ){
      return res.status(400).json(
        {error: error.details[0].message}
      )
    }

    const emailExist = await User.findOne({ where: {email: req.body.email} });
    if (emailExist) {
        return res.status(400).json(
            {error: 'Email already in use'}
        )
    }


    // Create a User
    const user = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role ? req.body.role : "user",
      password: bcrypt.hashSync(req.body.password, 8)
    };
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };


  const login = async(req, res) => {
      const { error } = schemaLogin.validate(req.body);
      if( error ){
        return res.status(400).json(
          {error: error.details[0].message}
        )
      }

      try {
        const { email, password } = req.body
        const user = await User.findOne({where:{ email }})
        
        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        
        const tokenSession = await tokenSign(user)

        if (checkPassword) { 
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

      } catch (e) {
        console.log(e);
          res.send(e);
      }
  };

  // Retrieve all Users from the database.
    findAllUser = (req, res) => {
        User.findAll()
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Users."
            });
        });
    };
     // Update a User by the id in the request
    updateUser = (req, res) => {
        const { error } = schemaUpdateUser.validate(req.body);
        if( error ){
          return res.status(400).json(
            {error: error.details[0].message}
          )
        }
        const id = req.params.id;
        User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
            if (num == 1) {
                res.status(200).send({
                message: "User was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
    };

    // Delete a User with the specified id in the request
    deleteUser = (req, res) => {
        const id = req.params.id;
        User.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "User was deleted successfully!"
              });
            } else {
              res.send({
                message: `User delete Comment with id=${id}. Maybe User was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete User with id=" + id
            });
          });
    };


module.exports = {
    createUser,
    login,
    findAllUser,
    updateUser,
    deleteUser
}