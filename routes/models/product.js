let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
    title: String,
    description: String,
    price: Number
});

let Product = module.exports = mongoose.model('Product', Schema);