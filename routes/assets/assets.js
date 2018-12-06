const fs = require('fs');
let assets_file;

assets_file = fs.readFileSync('assets.json');
assets_file = JSON.parse(assets_file);


module.exports = assets_file;
