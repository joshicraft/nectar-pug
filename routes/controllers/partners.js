    let assets = require("../assets/assets");

const express = require("express"),
    router = express.Router();

router.get("/", function (req, res) {
    res.render("partners", {
        contact: assets.contact,
        social_media: assets.social_media,
        page: "partners",
        title: "Nectar's awesome partners",
        description: "Here's a list of the awesome partners we've teamed up with. Go check them out :)",
        data: [
            {
                title: 'Partner#1',
                copy: "This partner...",
                website: "nectarpartner1.com",
                image: '/images/partner1.jpg'
            },
            {
                title: 'Partner#2',
                copy: "This partner...",
                website: "nectarpartner2.com",
                image: '/images/partner2.jpg'
            },
            {
                title: 'Partner#3',
                copy: "This partner...",
                website: "nectarpartner3.com",
                image: '/images/partner3.jpg'
            },
            {
                title: 'Partner#4',
                copy: "This partner...",
                website: "nectarpartner4.com",
                image: '/images/partner4.jpg'
            }
        ]
    })
});


module.exports = router;

