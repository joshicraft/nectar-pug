const express = require("express"),
    router = express.Router(),
    Partner = require("../../models/admin/partner");

router.post("/", function (req, res) {
    let new_partner = new Partner(req.body)
    new_partner.save().then(() => {
        res.redirect("/users/partners")
    })
});

router.get("/", ensureAuthenticated, function (req, res) {
    Partner.find({}, "", function (error, data) {
        if (error) {
            console.error(error);
        }
        //console.log(data)
        req.flash("partners", data)
        req.flash("page", "partners")
        req.flash("user", req.user.username)
        res.render("users/partners", req.flash())
    }).sort({_id: -1})
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


module.exports = router;