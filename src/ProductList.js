import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => renderProducts(product))}
    </div>
  )
}

const renderProducts = product => (
  <Link to={`/products/${product.id}`} key={product.id}>
    <div data-testid="single-product">{product.name}</div>
  </Link>
)

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList
