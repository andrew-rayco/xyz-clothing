import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { calculateLocalPrice } from '../utils'

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
      productIndex: ''
    }
  }

  componentDidMount() {
    const { productId, allProducts } = this.props
    const thisProduct = this.findProduct(productId, allProducts)
    const thisIndex = this.findIndex(productId, allProducts)

    this.setState({ product: { ...thisProduct }, productIndex: thisIndex })
  }

  // Since product id can be changed by user, we need the index of the
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

  // replace product in allProducts by index
  // i.e. Putting it back where we found it.
  mergeProducts() {
    const { productIndex, product } = this.state
    const products = this.props.allProducts
    products[productIndex] = product

    return products
  }

  handleChange(e, selectName) {
    const { target } = e
    let name, value
    if (selectName) {
      // Handles select-react output from currency dropdown list
      name = selectName.split('-')[1]
      value = e.value
      console.log(name, value)

      const { base, amount } = this.state.product.price
      const newPrice = calculateLocalPrice(base, parseInt(amount), value)

      this.setState({
        product: {
          ...this.state.product,
          price: { ...this.state.product.price, [name]: value }
        }
      })
      this.setState({
        product: {
          ...this.state.product,
          price: {
            base: value,
            amount: newPrice
          }
        }
      })
      console.log('Change detected. State updated ' + name + ' = ' + value)
    } else {
      name = target.name
      value = name === 'id' ? parseInt(target.value) : target.value

      this.setState({ product: { ...this.state.product, [name]: value } })
      console.log('Change detected. State updated ' + name + ' = ' + value)
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

    return (
      <div className="edit-form">
        <h2>Edit {name}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-fields">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => this.handleChange(e)}
                  placeholder="Name"
                />
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
                <label htmlFor="related">Related</label>
                <input
                  name="related"
                  type="text"
                  value={relatedProducts}
                  onChange={e => this.handleChange(e)}
                  placeholder="Select related"
                />
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <label htmlFor="price-amount">Price Amount</label>
                <input
                  name="price-amount"
                  type="number"
                  value={price.amount}
                  onChange={e => this.handleChange(e)}
                  placeholder="Price amount"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price-base">Price Base</label>
                <Select
                  value={{ label: price.base }}
                  onChange={e => this.handleChange(e, 'price-base')}
                  options={selectOptions}
                  className="rs-container"
                  classNamePrefix="rs"
                  name="price-base"
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">id</label>
                <input
                  type="number"
                  name="id"
                  value={id}
                  onChange={e => this.handleChange(e)}
                  placeholder="id"
                />
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" />
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
