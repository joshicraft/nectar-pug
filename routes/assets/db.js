
//Include crypto to generate the product id
let crypto = require('crypto');

module.exports = function() {
    return {
        list : [],
        /*
         * Save the product inside the "assets".
         */
        save(product) {
            product.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.list.push(product);
            return 1;           
        },
        /*
         * Retrieve a product with a given id or return all the products if the id is undefined.
         */
        find(name) {
            if(name) {
                return this.list.find(element => {
                        return element.name === name;
                    }); 
            }else {
                return this.list;
            }
        },
        getAll() {
            return this.list;
        },
        /*
         * Delete a product with the given id.
         */
        remove(name) {
            let found = 0;
            this.list = this.list.filter(element => {
                    if(element.name === name) {
                        found = 1;
                    }else {
                        return element.name !== name;
                    }
                });
            return found;           
        },
        /*
         * Update a product with the given name
         */
        update(name, product) {
            let productIndex = this.list.findIndex(element => {
                return element.name === name;
            });
            if(productIndex !== -1) {
                this.list[productIndex].title = product.title;
                this.list[productIndex].year = product.year;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  