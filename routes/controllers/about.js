let assets = require('../assets/assets');

const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('about', {
        contact: assets.contact,
        social_media: assets.social_media,
        page: 'about',
        title: 'All About Nectar\'s Natural and Delicious Drinks',
        description: 'The team at Nectar is committed to delivering quality, natural and superb tasting beverages. We have pride in what we\'ve created here and are convinced that our Tea based beverages are the best in market.',
        data: [
            {
                title: 'Tea',
                copy: "Our tea leaves are sourced in Indonesia then brewed to perfection using the best tea leaves, the right process and finest technology. Our Tea Extract provides the essential top note and most sort after tea flavour, resembling that of freshly brewed tea. Finally it's spray dried then delivered fresh to New Zealand.",
                image: '/images/tea-leaves.jpg'
            },
            {
                title: 'Extracts',
                copy: 'Our flavours are strictly tested and scrutinized to make sure we have only the best tasting beverages. We use extracts instead of artificial flavours as we believe in keeping things as natural as possible - leaving you feeling good about drinking our Nectar.',
                image: '/images/peach-fruit.jpg'
            },
            {
                title: 'Brew',
                copy: 'We blend all of our beverages locally - keeping all of our work close to home. This ensures Nectar is fresh for when you get your hands on a bottle.',
                image: '/images/nectar-jug.jpg'
            },
            {
                title: 'Bottle',
                copy: "Nectar beverages loves the idea of keeping New Zealand green. We have done our part by bottling Nectar in an elegant glass bottle and using paper labels to make it 100% recyclable. When you are drinking nectar not only are you supporting a local business you're also doing your part for the environment.",
                image: '/images/bottles-side.jpg'
            },
            {
                title: 'Nectar',
                copy: "The team at Nectar is committed to delivering quality, natural and superb tasting beverages. We have pride in what we've created here and are convinced that our Tea based beverages are the best in market.",
                image: '/images/bottle-hand.jpeg',
                svg: true
            }
        ]
    })
}).post('/about', function (req, res) {
    console.log(require('./assets/stockist'));
});

router.get('/store', function (req, res) {
    console.log(require('./assets/stockist'));
});

module.exports = router;
