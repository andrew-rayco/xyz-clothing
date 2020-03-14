import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import ProductList from './ProductList'

import products from './data/products.json'

test('ProductList renders correct amount of products', () => {
  const { getAllByTestId } = render(
    <Router>
      <ProductList products={products} />
    </Router>
  )
  const productArray = getAllByTestId('single-product')
  expect(productArray.length).toBe(5)
})
