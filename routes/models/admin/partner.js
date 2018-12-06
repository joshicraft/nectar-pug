let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
	address: Number,
	website: String,
    phone: String,
    bio: String
});

let Partner = mongoose.model('Partner', Schema);

module.exports = Partner
