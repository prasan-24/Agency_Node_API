const db = require('../model/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { success, error, validation } = require('../helper/response');

const User = db.user;
const SECRET_KEY = process.env.SECRET_KEY;

exports.signUp = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }

        if (user) {
            return res.status(200).json(success("Registeration Completed Successfully", user, 200));
        }
    })
}

exports.signIn = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }

        if (!user) {
            return res.status(400).json(validation("User Not found.", 400));
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );

        if (!passwordIsValid) {
            return res.status(400).json(validation("Invalid Password!", 400));
        }

        let token = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: 86400
        });

        return res.status(200).json(success("Logged In Successfully", {
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        }, 200));

    })
}