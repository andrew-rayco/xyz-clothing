import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { calculateLocalPrice } from '../utils'

const ProductList = ({ allProducts, userCurrency }) => {
  return (
    <div className="product-list">
      <h2>All Products</h2>
      {renderProducts(allProducts, userCurrency)}
    </div>
  )
}

const renderProducts = (allProducts, userCurrency) => {
  return allProducts.map(singleProd => {
    const { id, name, price } = singleProd

    return (
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
  })
}

ProductList.propTypes = {
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default ProductList
