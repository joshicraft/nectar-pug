let assets = require('../assets/assets');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('privacy-policy', {
        contact: assets.contact,
        social_media: assets.social_media,
        page: 'privacy-policy',
        title: 'Nectar\'s Privacy Policy',
        description: 'A little info into what Nectar does with any information we get from you visiting our website'
    })
});


module.exports = router;