let assets = require('../assets/assets');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('contact', {
        contact: assets.contact,
        social_media: assets.social_media,
        page: 'contact',
        title: 'Contact the Team at Nectar',
        description: 'Nectar\'s fresh, delicious and natural Tea beverages supplied right to your store. Get in touch with us'
    })
});

module.exports = router;