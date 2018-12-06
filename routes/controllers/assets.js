const express = require('express'),
    router = express.Router();

router.put('/update', function (req, res) {
    let assets_file = fs.readFileSync('assets.json'),
        update_file;

    update_file = Object.assign(JSON.parse(req.body), JSON.parse(assets_file));

    fs.writeFileSync('assets.json', update_file);
});

router.post('/delete', function (req, res) {
    let assets_file = fs.readFileSync('assets.json'),
        update_file;

    update_file = Object.assign(JSON.parse(req.body), JSON.parse(assets_file));

    fs.writeFileSync('assets.json', update_file);
});

module.exports = router;