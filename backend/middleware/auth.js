const jwt = require('jsonwebtoken')

module.exports.authenticateJwt = (req, res, next) => {
    try {
        const bearerToken = req.get('authorization');
        // Check if token exists
        if (!bearerToken || !bearerToken.toLowerCase().startsWith('bearer ')) {
            return res.status(401).send({message: "A token is required for authentication!"});
        }
        const token = bearerToken.substring(7);
        // Check if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.role = decodedToken.role;
        next();
    } catch (err) {
        return res.status(401).send({message: "Token is invalid!"});
    }
}

module.exports.accessControl = (authorizedRoles) => {
    return (req, res, next) => {
        try {
            const role = req.role
            let userAuthorized = (authorizedRoles.indexOf(role) > -1);
            if (authorizedRoles[0] === "*") userAuthorized = true;
            if (!userAuthorized) return res.status(403).send({message: "User is not authorized!"});
            next();
        } catch (err) {
            return res.status(403).send({message: "Authorization check failed"});
        }
    };
}