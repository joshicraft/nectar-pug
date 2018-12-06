let assets = require('../assets/assets');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('landings/landing-stock', {
        contact: assets.contact,
        social_media: assets.social_media,
        page: 'landing-stock',
        title: 'Stock, Sample or Buy Nectar\'s Delicious Beverages',
        description: 'Stock sample or buy Nectar\'s fresh, delicious and natural Tea beverages'
    })
});

module.exports = router;