import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import SingleProduct from './SingleProduct'

import allProducts from '../data/products.json'

test('SingleProduct renders `Brown Shoes` product correctly', () => {
  const { getByText } = render(
    <Router>
      <SingleProduct
        allProducts={allProducts}
        productId={1}
        userCurrency={'AUD'}
      />
    </Router>
  )
  const expectedTitle = getByText('Brown Shoes')
  expect(expectedTitle).toBeTruthy()
})

test('SingleProduct renders `Blue Shirt` product correctly', () => {
  const { getByText } = render(
    <Router>
      <SingleProduct
        allProducts={allProducts}
        productId={5}
        userCurrency={'AUD'}
      />
    </Router>
  )
  const expectedTitle = getByText('Blue Shirt')
  expect(expectedTitle).toBeTruthy()
})
