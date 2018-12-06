let assets = require("../assets/assets");

const express = require("express"),
    router = express.Router();

router.get("/", function (req, res) {
    res.render("products", {
        contact: assets.contact,
        social_media: assets.social_media,
        page: "products",
        title: "A sweet range of the products we currently have stocked",
        description: "Check out the range of delicious drinks we have lined up for you. Find what you like and get in touch!",
        data: [{
            title: "Nectar Peach Tea",
            price: 1.5,
            name: "peach tea"
        }]
    })
});


module.exports = router;