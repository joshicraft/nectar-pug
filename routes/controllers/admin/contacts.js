const express = require("express"),
    router = express.Router(),
    Contacts = require("../../models/admin/contact");


router.post("/", function (req, res) {
    let new_contact = new Contacts(req.body)
    new_contact.save().then(() => {
        res.redirect("/users/contacts")
    })
});

router.get("/", ensureAuthenticated, function (req, res) {
   Contacts.find({}, "", function (error, data) {
        if (error) {
            console.error(error);
        }
        //console.log(data)
        req.flash("contacts", data)
        req.flash("page", 'contacts')
        req.flash("user", req.user.username)
        res.render("users/contacts", req.flash())
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