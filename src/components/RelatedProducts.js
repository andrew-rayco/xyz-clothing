import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RelatedProducts = ({ relatedProds }) => {
  return (
    <div className="related-products">
      <h3>Related Products</h3>
      {relatedProds.map(prod => {
        return (
          <Link to={`/products/${prod.id}`} key={prod.name + prod.id}>
            <div data-testid="related">{prod.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default RelatedProducts
