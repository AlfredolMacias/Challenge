const { verifyToken } = require('../helpers/generateToken')
const db = require("../models");

const User = db.users;

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const tokenData = await verifyToken(token)
        const userData = await User.findByPk(tokenData.id) 

        /*
            admin
            CrearEliminarPosts
            ActualizarPosts
            EliminarComentarios
        */

        // ['user'].includes('user')
        if ([].concat(roles).includes(userData.role)) { 
            next()
        } else {
            res.status(409)
        res.send({ error: 'Sorry, you do not have the right permission to execute this action' })
        }

    } catch (e) {
        res.status(409)
        res.send({ error: 'Sorry, you do not have the right permission to execute this action' })
    }

}

module.exports = checkRoleAuth
