const express = require('express');
const router = express.Router();

let contact = require('./controllers/contact'),
    about = require('./controllers/about'),
    products = require('./controllers/products'),
    partners = require('./controllers/partners'),
    stockist = require('./controllers/stockist'),
    privacy_policy = require('./controllers/privacy-policy'),
    landing_stock = require('./controllers/landing-stock'),
    mail = require('./controllers/mail'),
    admin_products = require('./controllers/admin/products'),
    admin_contacts = require('./controllers/admin/contacts'),
    admin_stockists = require('./controllers/admin/stockists'),
    admin_partners = require('./controllers/admin/partners'),
    admin_social_media = require('./controllers/admin/social-media'),
    contact_list = require('./assets/contact'),
    social_media_list = require('./assets/social_media');

router.get('/', function (req, res) {
    res.render('index', {
        contact: contact_list,
        social_media: social_media_list,
        page: 'index',
        title: 'Nectar\'s Fresh, Natural Beverages',
        description: 'Nectar\'s fresh, delicious and natural Tea beverages supplied right to your store.'
    });
});

router.use('/send/', mail);
router.use('/about', about);
router.use('/contact', contact);
router.use('/stockist', stockist);

router.use('/products', products);

router.use('/partners', partners);

router.use('/privacy-policy', privacy_policy);

router.use('/stock-nectar-beverages', landing_stock);

router.use('/users/products', admin_products);
router.use('/users/social-medias', admin_social_media);
router.use('/users/contacts', admin_contacts);
router.use('/users/stockists', admin_stockists);
router.use('/users/partners', admin_partners);

module.exports = router;
