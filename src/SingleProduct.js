import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SingleProduct = ({ productId, allProducts }) => {
  const thisProduct = allProducts.find(prod => prod.id === productId)
  const { id, name, description } = thisProduct
  return (
    <div className="single-product">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Product ID: {id}</p>
      <Link to="/">Return to all products</Link>
    </div>
  )
}

SingleProduct.propTypes = {
  productId: PropTypes.number.isRequired
}

export default SingleProduct
