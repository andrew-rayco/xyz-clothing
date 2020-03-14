import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import RelatedProducts from './RelatedProducts'

const relatedProds = [
  {
    id: 1,
    name: 'Brown Shoes',
    description: 'A brown shirt made from fine cotton.',
    price: {
      base: 'USD',
      amount: 50
    },
    RelatedProducts: [2]
  },
  {
    id: 4,
    name: 'White Shirt',
    description: 'A pristine white shirt, sure to look great with any outfit.',
    price: {
      base: 'USD',
      amount: 20
    },
    relatedProducts: [3, 5]
  }
]

test('RelatedProducts renders correct amount of products', () => {
  const { getAllByTestId } = render(
    <Router>
      <RelatedProducts relatedProds={relatedProds} />
    </Router>
  )
  const actual = getAllByTestId('related')
  expect(actual.length).toBe(2)
})

test('RelatedProducts renders correct products', () => {
  const { getByText } = render(
    <Router>
      <RelatedProducts relatedProds={relatedProds} />
    </Router>
  )
  let actual = getByText('Brown Shoes')
  expect(actual).toBeTruthy()

  actual = getByText('White Shirt')
  expect(actual).toBeTruthy()
})
