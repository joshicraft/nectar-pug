let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String
	},
    phone: {
	    type: Number
    }
});

let Contact = module.exports = mongoose.model('contact', Schema);