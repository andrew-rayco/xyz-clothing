import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProductList from './ProductList'
import SingleProduct from './SingleProduct'
import Header from './Header'
import EditForm from './EditForm'
import Footer from './Footer'

import allProducts from '../data/products.json'
import '../scss/index.scss'

class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedCurrency: 'AUD',
      products: []
    }
  }

  componentDidMount() {
    this.setState({
      products: this.getLocalProducts() || allProducts
    })
  }

  getLocalProducts() {
    return JSON.parse(localStorage.getItem('allProducts'))
  }

  setLocalProducts(data) {
    localStorage.setItem('allProducts', JSON.stringify(data))
  }

  // updateProductData(data) {
  //   this.setState({ products: data }), setLocalProducts(data)
  // }

  handleCurrencyChange(e) {
    this.setState({ selectedCurrency: e.value })
  }

  render() {
    const { selectedCurrency, products } = this.state
    return (
      <Router>
        <div className="app">
          <Header
            handleChange={e => this.handleCurrencyChange(e)}
            userCurrency={selectedCurrency}
          />
          <Switch>
            <Route
              path="/products/:id/edit"
              component={({ match }) => (
                <EditForm
                  productId={parseInt(match.params.id)}
                  allProducts={products}
                  userCurrency={selectedCurrency}
                  setLocalProducts={this.setLocalProducts}
                />
              )}
            />
            <Route
              path="/products/:id"
              component={({ match }) => (
                <SingleProduct
                  productId={parseInt(match.params.id)}
                  allProducts={allProducts}
                  userCurrency={selectedCurrency}
                />
              )}
            />
            <Route
              path="/"
              exact
              component={() => (
                <ProductList
                  allProducts={allProducts}
                  userCurrency={selectedCurrency}
                />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
