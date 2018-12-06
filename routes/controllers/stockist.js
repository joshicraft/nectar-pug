let assets = require('../assets/assets');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('stockist', {
        contact: assets.contact,
        social_media: assets.social_media,
        map_config: assets.map,
        stockists: assets.stockist,
        page: 'stockist',
        title: 'Nectar\'s premium partners',
        description: 'Here you\'ll find a list of all our choice partners and where they exist so you can try a Nectar near you'
    })
});

router.get('/map', function(req, res){
    res.send(assets.map)
});


router.get('/list', function(req, res){
    res.send(assets.stockist)
});

module.exports = router;