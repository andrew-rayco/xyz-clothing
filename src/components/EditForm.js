import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      name: '',
      description: '',
      price: {
        base: '',
        amount: 0
      },
      relatedProducts: []
    }
  }

  componentDidMount() {
    const { productId, allProducts } = this.props
    const thisProduct = this.findProduct(productId, allProducts)
    this.setState({ ...thisProduct })
    console.log(thisProduct)
  }

  findProduct = (productId, allProducts) => {
    return allProducts.find(prod => prod.id === productId)
  }

  handleChange(e) {
    const { target } = e
    const name = target.name
    const value = name === 'id' ? parseInt(target.value) : target.value

    this.setState({
      [name]: value
    })
    console.log('Change detected. State updated ' + name + ' = ' + value)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('A form was submitted: ' + this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group">
            <label htmlFor="id">id</label>
            <input
              type="number"
              name="id"
              value={this.state.id}
              onChange={e => this.handleChange(e)}
              placeholder="id"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              type="text"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price-amount">Price Amount</label>
            <input
              name="price-amount"
              type="number"
              value={this.state.price.amount}
              onChange={e => this.handleChange(e)}
              placeholder="Price amount"
            />

            <label htmlFor="price-base">Price Base</label>
            <input
              name="price-base"
              type="text"
              value={this.state.price.base}
              onChange={e => this.handleChange(e)}
              placeholder="Base price currency"
            />
          </div>
          <p>Related products select field?</p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

EditForm.propTypes = {
  productId: PropTypes.number.isRequired,
  allProducts: PropTypes.array.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default EditForm
