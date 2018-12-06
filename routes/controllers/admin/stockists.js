const express = require("express"),
    router = express.Router(),
    Stockist = require("../../models/admin/stockist");

router.post("/", function (req, res) {
    let new_stockist = new Stockist(req.body)
    new_stockist.save().then(() => {
        res.redirect("/users/stockists")
    })
});

router.get("/", ensureAuthenticated, function (req, res) {
    Stockist.find({}, "", function (error, data) {
        if (error) {
            console.error(error);
        }
        //console.log(data)
        req.flash("stockists", data)
        req.flash("page", "stockists")
        req.flash("user", req.user.username)
        res.render("users/stockists", req.flash())
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