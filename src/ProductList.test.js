import React from 'react'
import { render } from '@testing-library/react'

import ProductList from './ProductList'

import products from './data/products.json'

test('ProductList renders correct amount of products', () => {
  const { getAllByTestId } = render(<ProductList products={products} />)
  const productArray = getAllByTestId('single-product')
  expect(productArray.length).toBe(5)
})
