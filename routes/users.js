let express = require("express");
let router = express.Router();
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let User = require("./models/admin/user")



router.get("/", ensureAuthenticated, function (req, res) {
    req.flash("page", "Dashboard");
    req.flash("user", req.user.username);
    res.render("users/dashboard", req.flash());
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in!");
        req.flash('page', 'login')
        res.render("users/login", req.flash())
    }
}


// Register
router.get("/register", function (req, res) {
    req.flash("page", "register");
    res.render("users/register", req.flash());
});

// Login
// router.get('/login', function (req, res) {
// 	res.render('users/login', req.flash());
// });
router.get("/login", function (req, res, next) {

    //res.render('users/login', req.flash());
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.flash("page", "login");
            return res.render("users/login", req.flash())
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            req.flash("success", "Re-logged in as: " + user.username);
            req.flash("page", "dashboard");
            return res.render("users/login", req.flash());
        });
    })(req, res, next);
});

// Register User
router.post("/register", function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    // Validation
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password2", "Passwords do not match").equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        console.log("error " + JSON.stringify(errors));
        req.flash("error_msg", JSON.stringify(errors))
        req.flash("error", errors)
        req.flash("page", "register");
        res.render("./users/register", req.flash())
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
                    console.log("'This account is all-ready registered, try again.' " + err)
                    req.flash("error_msg", "This account is all-ready registered, try again.");
                    res.render("users/register", {
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
                    req.flash("success", "You are registered and can now login");
                    res.render("/users/login", req.flash());
                }
            });
        });
    }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {

            if (err) throw err;
            if (!user) {
                console.log("Unknown User")
                return done(null, false, {message: "Unknown User"});
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    console.log("User found.... Logging in");
                    return done(null, user);
                } else {
                    console.log("Invalid password");
                    return done(null, false, {message: "Invalid password"});
                }
            });
        });

    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/users/register"
    }),
    function (req, res) {
        // req.flash('user', req.user.username)
        req.flash('page', 'dashboard');
        console.log(req.flash())
        res.redirect("/users");
    }
);


router.get("/logout", function (req, res) {
    req.flash("success", "You are logged out");
    req.logout();
    req.flash('page', 'login');
    res.redirect("/users/login");
});


module.exports = router;
