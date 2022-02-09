// Code goes here!
import _ from 'lodash'

import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Product } from './product.m'

console.log(_)

const products = [
	{ title: 'Book', price: 10.99 },
	{ title: 'Bottle', price: 4.99 },
]
const loadedProducts = plainToInstance(Product, products)
console.log(loadedProducts)

const dummyProduct = new Product('', -1)
validate(dummyProduct).then((errors) => {
	if (errors.length > 0) {
		console.log('VALIDATE ERRORS', errors)
	} else {
		dummyProduct.getInformation()
	}
})
