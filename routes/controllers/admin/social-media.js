const express = require("express"),
    router = express.Router(),
    Social = require("../../models/admin/social-media");


router.post("/", function (req, res) {
    let new_contact = new Social(req.body)
    new_contact.save().then(() => {
        res.redirect("/users/social-medias")
    })
});

router.get("/", ensureAuthenticated, function (req, res) {
   Social.find({}, "", function (error, data) {
        if (error) {
            console.error(error);
        }
        //console.log(data)
        req.flash("social-media", data)
        req.flash("page", 'social-media')
        req.flash("user", req.user.username)
        res.render("users/social-medias", req.flash())
    }).sort({_id: -1})
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in!');
         req.flash('page', 'login')
        res.render("users/login", req.flash())
    }
}

module.exports = router;