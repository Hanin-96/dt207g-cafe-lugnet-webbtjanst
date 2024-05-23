//Token
const jwt = require("jsonwebtoken");

//Validera token för åtkomst till skyddad route
function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token

    if (token == null) {
        return res.status(401).json({ message: "Token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) {
            return res.status(403).json({ message: "Not correct JWT" });
        } else {
            req.username = username;
            next();
        }
    });
}

//Exportera modulen
module.exports = authToken;
