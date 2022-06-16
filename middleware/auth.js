const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization 
        const tokenData = await verifyToken(token)
        console.log(tokenData);
        if (tokenData.id) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'You need to login first' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'You need to login first' })
    }

}

module.exports = checkAuth