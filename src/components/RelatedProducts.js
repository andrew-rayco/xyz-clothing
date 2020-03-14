import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { calculateLocalPrice } from '../utils'

const RelatedProducts = ({ relatedProds, userCurrency }) => {
  return (
    <div className="related-products">
      <h3>Related Products</h3>
      {relatedProds.map(prod => {
        const { id, name, price } = prod
        return (
          <Link to={`/products/${id}`} key={name + id}>
            <div data-testid="related">
              <span>{name}</span>
              <span>
                {userCurrency}{' '}
                {calculateLocalPrice(price.base, price.amount, userCurrency)}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

RelatedProducts.propTypes = {
  relatedProds: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default RelatedProducts
