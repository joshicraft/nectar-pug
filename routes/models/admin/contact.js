let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
    mobile: String,
    email: String,
    address: String
});

let Contact = mongoose.model('Contact', Schema);

module.exports = Contact