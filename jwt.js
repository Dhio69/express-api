const jwt = require("jsonwebtoken")
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(200).json({
            code : 401,
            message : 'token empty',
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if ( err ) {
            return res.status(200).json({
                code : 403,
                message : 'not autorized',
            })
        }

        req.user = user
        next()
    })
}

module.exports = authenticateToken;