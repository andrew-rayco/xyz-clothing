import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductList = ({ allProducts }) => {
  return (
    <div className="product-list">
      {allProducts.map(singleProd => renderProducts(singleProd))}
    </div>
  )
}

const renderProducts = ({ name, id }) => (
  <Link to={`/products/${id}`} key={id}>
    <div data-testid="single-product">{name}</div>
  </Link>
)

ProductList.propTypes = {
  allProducts: PropTypes.array.isRequired
}

export default ProductList
