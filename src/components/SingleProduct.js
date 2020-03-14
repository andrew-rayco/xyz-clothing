import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import RelatedProducts from './RelatedProducts'

import { calculateLocalPrice } from '../utils'

const SingleProduct = ({ productId, allProducts, userCurrency }) => {
  const thisProduct = allProducts.find(prod => prod.id === productId)

  const { id, name, description, price, relatedProducts } = thisProduct

  const relatedProductDetails = allProducts.filter(prod =>
    relatedProducts.includes(prod.id)
  )

  return (
    <div className="single-product">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>
        <span>{userCurrency}</span>{' '}
        {calculateLocalPrice(price.base, price.amount, userCurrency)}
      </p>
      <p>Product ID: {id}</p>

      {relatedProductDetails ? (
        <RelatedProducts relatedProds={relatedProductDetails} />
      ) : null}

      <Link to="/">Return to all products</Link>
    </div>
  )
}

SingleProduct.propTypes = {
  productId: PropTypes.number.isRequired,
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default SingleProduct
