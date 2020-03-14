import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { calculateLocalPrice } from '../utils'

const ProductList = ({ allProducts, userCurrency, calculateLocalPrice }) => {
  return (
    <div className="product-list">
      <h2>All Products</h2>
      {allProducts.map(singleProd => renderProducts(singleProd, userCurrency))}
    </div>
  )
}

const renderProducts = ({ name, id, price }, userCurrency) => (
  <Link to={`/products/${id}`} key={id}>
    <div data-testid="single-product">
      <span>{name}</span>
      <span>
        {' '}
        - {userCurrency}{' '}
        {calculateLocalPrice(price.base, price.amount, userCurrency)}
      </span>
    </div>
  </Link>
)

ProductList.propTypes = {
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default ProductList
