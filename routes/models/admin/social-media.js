let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
    mobile: String,
    email: String,
    address: String
});

let SocialMedia = mongoose.model('SocialMedia', Schema);

module.exports = SocialMedia