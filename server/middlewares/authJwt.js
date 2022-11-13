const jwt = require("jsonwebtoken");

const { success, error, validation } = require('../helper/response');

const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).json(validation("Authorization token required!", 400));
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json(validation("Invalid Token", 400));
        }
        req.userId = decoded.id;
        next();
    });
}