import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SingleProduct = ({ productId }) => {
  return (
    <div className="single-product">
      <p>The id is {productId}</p>
      <Link to="/">Return to all products</Link>
    </div>
  )
}

SingleProduct.propTypes = {
  productId: PropTypes.number.isRequired
}

export default SingleProduct
