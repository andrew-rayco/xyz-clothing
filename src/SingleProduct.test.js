import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import SingleProduct from './SingleProduct'

import allProducts from './data/products.json'

test('SingleProduct renders correct product data', () => {
  const { getByText } = render(
    <Router>
      <SingleProduct allProducts={allProducts} productId={1} />
    </Router>
  )
  const expectedTitle = getByText('Brown Shoes')
  expect(expectedTitle).toBeTruthy()
})
