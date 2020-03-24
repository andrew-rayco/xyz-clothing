import React from 'react'
import PropTypes from 'prop-types'

const renderRelatedProducts = relatedProds => {
  return (
    <div className="related-list">
      {relatedProds.map(prod => {
        return (
          <p key={`related-edit-${prod.id}`}>
            {prod.name} <span className="sub-text">Product # {prod.id}</span>
          </p>
        )
      })}
    </div>
  )
}

const RelatedEdit = ({ allProducts, relatedProducts }) => {
  let relatedProductDetails = allProducts.filter(prod => {
    return relatedProducts.includes(prod.id)
  })

  return (
    <div className="related-edit">
      {renderRelatedProducts(relatedProductDetails)}
    </div>
  )
}

RelatedEdit.propTypes = {
  allProducts: PropTypes.array.isRequired,
  relatedProducts: PropTypes.array.isRequired
}

export default RelatedEdit
