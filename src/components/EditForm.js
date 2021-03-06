import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Select from 'react-select'

import RelatedEdit from './RelatedEdit'

import { calculateLocalPrice, validateInput } from '../utils'

const selectOptions = [
  { value: 'AUD', label: 'AUD' },
  { value: 'USD', label: 'USD' },
  { value: 'CNY', label: 'CNY' }
]

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        id: '',
        name: '',
        description: '',
        price: {
          base: '',
          amount: ''
        },
        relatedProducts: []
      },
      productIndex: '',
      isValid: {
        id: true,
        name: true,
        price: {
          base: true,
          amount: true
        }
      },
      submitDisabled: false
    }
  }

  componentDidMount() {
    const { productId, allProducts } = this.props
    const thisProduct = this.findProduct(productId, allProducts)
    const thisIndex = this.findIndex(productId, allProducts)

    this.setState({
      product: { ...thisProduct },
      productIndex: thisIndex
    })
  }

  // Since product id can be changed by user, we need the index for the
  // product we're editing to return the updated product to array.
  findIndex(productId, allProducts) {
    let productIndex

    allProducts.map((prod, i) => {
      if (prod.id === productId) {
        productIndex = i
      }
    })
    return productIndex
  }

  findProduct(productId, allProducts) {
    return allProducts.find(prod => prod.id === productId)
  }

  // Puts the edited product back where we found it.
  mergeProducts() {
    const { productIndex, product } = this.state
    const products = this.props.allProducts
    products[productIndex] = product

    return products
  }

  handleChange(e, selectName) {
    const { target } = e
    const { allProducts, productId } = this.props
    let name, value
    if (selectName) {
      // Handles select-react output from currency dropdown list
      // or from price-amount
      name = selectName.split('-')[1]
      value = e.value || parseFloat(e.target.value)
      const isValid = validateInput(name, value, allProducts, productId)

      if (name === 'base') {
        const { base, amount } = this.state.product.price
        const newPrice = calculateLocalPrice(base, parseFloat(amount), value)

        this.setState({
          product: {
            ...this.state.product,
            price: {
              base: value,
              amount: newPrice
            }
          },
          isValid: {
            ...this.state.isValid,
            price: {
              ...this.state.isValid.price,
              [name]: isValid
            }
          },
          submitDisabled: !isValid
        })
      } else {
        this.setState({
          product: {
            ...this.state.product,
            price: {
              ...this.state.product.price,
              amount: parseFloat(value) || ''
            }
          },
          isValid: {
            ...this.state.isValid,
            price: {
              ...this.state.isValid.price,
              [name]: isValid
            }
          },
          submitDisabled: !isValid
        })
      }
    } else {
      name = target.name
      value = name === 'id' ? parseFloat(target.value) : target.value

      const isValid = validateInput(name, value, allProducts, productId)

      this.setState({
        product: {
          ...this.state.product,
          [name]: value
        },
        isValid: {
          ...this.state.isValid,
          [name]: isValid
        },
        submitDisabled: !isValid
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const newAllProducts = this.mergeProducts()
    this.props.updateProducts(newAllProducts)
    this.props.history.push('/')
  }

  render() {
    const { id, name, description, price, relatedProducts } = this.state.product
    const { isValid } = this.state
    return (
      <div className="edit-form">
        <h2>Edit {name}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-fields">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="name">Name*</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => this.handleChange(e)}
                  placeholder="Name"
                  className={isValid.name ? '' : 'error'}
                />
                {isValid.name ? null : (
                  <p className="error-text">
                    Name must be longer than 3 characters
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  type="text"
                  value={description}
                  onChange={e => this.handleChange(e)}
                  placeholder="Description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <p className="label">Related Products</p>
                <RelatedEdit
                  allProducts={this.props.allProducts}
                  relatedProducts={relatedProducts}
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label htmlFor="price-amount">Price Amount*</label>
                <input
                  name="price-amount"
                  type="number"
                  value={parseFloat(price.amount).toFixed(2)}
                  onChange={e => this.handleChange(e, 'price-amount')}
                  placeholder="Price amount"
                  className={isValid.price.amount ? '' : 'error'}
                  step="0.01"
                />
                {isValid.price.amount ? null : (
                  <p className="error-text">Free? You crazy?</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="price-amount">Price Base*</label>
                <Select
                  value={{ label: price.base }}
                  onChange={e => this.handleChange(e, 'price-base')}
                  options={selectOptions}
                  className={
                    isValid.price.base ? 'rs-container' : 'rs-container error'
                  }
                  classNamePrefix="rs"
                  name="price-amount"
                  onMenuOpen={() =>
                    console.log(
                      'Non-passive violations (in Chrome) courtesy of `react-select` dependency. They irk me. I am irked.\nRefer https://github.com/JedWatson/react-select/issues/2729'
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="id">Id*</label>
                <input
                  type="number"
                  name="id"
                  value={id}
                  onChange={e => this.handleChange(e)}
                  placeholder="id"
                  className={isValid.id ? '' : 'error'}
                />
                {isValid.id ? (
                  ''
                ) : (
                  <p className="error-text">Id must be unique</p>
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Update"
            disabled={this.state.submitDisabled}
          />
        </form>
        <div className="edit-links">
          <Link to="/" className="home-link">
            <span>&lt;</span> Return to all products
          </Link>
          <Link to={`/products/${this.props.productId}`} className="home-link">
            View this product <span>&gt;</span>
          </Link>
        </div>
      </div>
    )
  }
}

EditForm.propTypes = {
  productId: PropTypes.number.isRequired,
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired,
  updateProducts: PropTypes.func.isRequired
}

export default withRouter(EditForm)
