const db = require('../model/index');
const { success, error, validation } = require('../helper/response');

const User = db.user;

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }

        if (user) {
            return res.status(400).json(validation("Username Already Exists!", 400));
        }

        //Email

        User.findOne({
            email: req.body.email
        }).exec((err,user)=>{
            if (err) {
                return res.status(500).json(error(err, 500));
            }
    
            if (user) {
                return res.status(400).json(validation("Email Already Exists!", 400));
            }
        })

        next();
    })
}