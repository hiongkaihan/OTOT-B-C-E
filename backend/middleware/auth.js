const jwt = require('jsonwebtoken')

module.exports.authenticateJwt = (req, res, next) => {
    try {
        const bearerToken = req.get('authorization');
        console.log(bearerToken)
        // Check if token exists
        if (!bearerToken || !bearerToken.toLowerCase().startsWith('bearer ')) {
            return res.status(401).send({message: "A token is required for authentication, please log in again!"});
        }
        const token = bearerToken.substring(7);
        // Check if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.role = decodedToken.role;
        next();
    } catch (err) {
        return res.status(401).send({message: "Token is invalid, please log in again!"});
    }
}

module.exports.accessControl = (authorizedRoles) => {
    return (req, res, next) => {
        try {
            const role = req.role
            const userAuthorized = (authorizedRoles.indexOf(role) > -1);
            if (!userAuthorized) return res.status(403).send({message: "User is not authorized!"});
            next();
        } catch (err) {
            return res.status(403).send({message: "Authorization check failed"});
        }
    };
}