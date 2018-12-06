let express = require('express');
let router = express.Router();

let User = require('../../models/admin/user');


// Register
router.get('/', function (req, res) {
    res.render('/');
});

// Register User
router.post('/', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('./users/register', {
            errors: errors
        });
    }
    else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b", "$options": "i"
            }
        }, function (err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b", "$options": "i"
                }
            }, function (err, mail) {
                if (user || mail) {
                    req.flash('error_msg', 'This account is all-ready registered, try again.');
                    res.render('users/register', {
                        user: user,
                        mail: mail
                    });
                }
                else {
                    let newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password
                    });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    req.flash('success', 'You are registered and can now login');
                    res.redirect('/users/login');
                }
            });
        });
    }
});

module.exports = router;