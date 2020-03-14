import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { calculateLocalPrice } from '../utils'

const RelatedProducts = ({ relatedProds, userCurrency }) => {
  return (
    <div className="related-products">
      <h3>Related Products</h3>
      {renderRelatedProds(relatedProds, userCurrency)}
    </div>
  )
}

const renderRelatedProds = (relatedProds, userCurrency) => {
  return relatedProds.map(prod => {
    const { id, name, price } = prod

    return (
      <Link to={`/products/${id}`} key={name + id}>
        <div className="related-product" data-testid="related">
          <p>{name}</p>
          <p>
            <span>{userCurrency}</span>
            {calculateLocalPrice(price.base, price.amount, userCurrency)}
          </p>
        </div>
      </Link>
    )
  })
}

RelatedProducts.propTypes = {
  relatedProds: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default RelatedProducts
