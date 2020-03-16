import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { calculateLocalPrice } from '../utils'

const ProductList = ({ allProducts, userCurrency, clearMemory }) => {
  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="products">
        {renderProducts(allProducts, userCurrency)}
      </div>
      <button onClick={() => clearMemory()}>Undo all changes</button>
    </div>
  )
}

const renderProducts = (allProducts, userCurrency) => {
  return allProducts.map(singleProd => {
    const { id, name, price } = singleProd

    return (
      <Link to={`/products/${id}`} key={id}>
        <div className="single-product" data-testid="single-product">
          <p>{name}</p>
          <p>
            <span>{userCurrency}</span>
            {calculateLocalPrice(
              price.base,
              parseInt(price.amount),
              userCurrency
            )}
          </p>
        </div>
      </Link>
    )
  })
}

ProductList.propTypes = {
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired,
  clearMemory: PropTypes.func.isRequired
}

export default ProductList
