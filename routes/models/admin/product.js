let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: String,
	price: Number,
	sale: String
});

let Product = mongoose.model('Product', Schema);

module.exports = Product
//
// module.exports.getProducts = function(callback){
// 	Product.find();
// };
//
// module.exports.addProduct = function(product, callback){
// 	Product.insert(product);
// };
