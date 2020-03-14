import React from 'react'
import PropTypes from 'prop-types'

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => renderProducts(product))}
    </div>
  )
}

const renderProducts = product => <div key={product.id}>{product.name}</div>

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList
