import React from 'react'

import ProductList from './ProductList'

import products from './data/products.json'

export default () => (
  <>
    <h1>XYZ Clothing</h1>
    <ProductList products={products} />
  </>
)
