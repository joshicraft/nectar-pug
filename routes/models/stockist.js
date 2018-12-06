let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	firstname: {
		type: String
	},
    lastname: {
		type: String
	},
	address: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: Number
	},
	mobile: {
		type: Number
	}
});

let Stockist = module.exports = mongoose.model('Stockist', Schema);