import React from 'react'

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => renderProducts(product))}
    </div>
  )
}

const renderProducts = product => <div key={product.id}>{product.name}</div>

export default ProductList
