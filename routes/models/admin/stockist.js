let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
	address: Number,
	website: String,
    phone: String
});

let Stockist = mongoose.model('Stockist', Schema);

module.exports = Stockist
