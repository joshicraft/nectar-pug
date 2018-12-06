let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../../models/admin/user');


router.get('/', function (req, res, next) {

    //res.render('users/login', req.flash());
   // return res.render('../', req.flash());
    passport.authenticate('local', function (err, user, info) {
      ///  console.log(user)
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error_msg', 'Login Failed - No user found!');
            req.flash('page', 'login');
            return res.render('/', req.flash());
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Directing to login');
            req.flash('page', 'login');
            return res.render('../', req.flash());
        });
    })(req, res, next);
});

router.post('/',
    passport.authenticate('local', {
        failureFlash: 'Login Failed!',
        successRedirect: '../',
        failureRedirect: '/'
    }),
    function (req, res) {
        req.flash('user', req.user.username);
        req.flash('page', 'login');
        res.redirect('../');
    }
);
// Login



module.exports = router;



