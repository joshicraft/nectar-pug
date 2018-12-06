const express = require("express"),
    router = express.Router(),
    Product = require("../../models/admin/product");

router.post("/", function (req, res) {
    let new_product = new Product(req.body)
    new_product.save().then(() => {
        res.redirect("/users/products")
    })
});


router.get("/", ensureAuthenticated, function (req, res) {
   Product.find({}, "", function (error, data) {
        if (error) {
            console.error(error);
        }
        //console.log(data)
        req.flash("products", data)
        req.flash("page", 'products')
        req.flash("user", req.user.username)
        res.render("users/products", req.flash())
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