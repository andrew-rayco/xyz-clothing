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
      products: this.getLocalProducts()
    })
  }

  // Checks localStorage for existing product data.
  // If none, initiates localStorage with raw products data
  // and returns raw products to be added to state.
  getLocalProducts() {
    const localData = localStorage.getItem('allProducts')
    if (localData !== 'undefined' && localData !== null) {
      return JSON.parse(localData)
    } else {
      localStorage.setItem('allProducts', JSON.stringify(allProducts))
      return allProducts
    }
  }

  // Updates localStorage and state.
  updateProducts = data => {
    localStorage.setItem('allProducts', JSON.stringify(data))
    this.setState({ products: data })
  }

  handleCurrencyChange(e) {
    this.setState({ selectedCurrency: e.value })
  }

  clearMemory = () => {
    localStorage.clear()
    this.componentDidMount()
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
                  userCurrency={selectedCurrency}
                  allProducts={products}
                  updateProducts={this.updateProducts}
                />
              )}
            />
            <Route
              path="/products/:id"
              component={({ match }) => (
                <SingleProduct
                  productId={parseInt(match.params.id)}
                  allProducts={this.getLocalProducts()}
                  userCurrency={selectedCurrency}
                />
              )}
            />
            <Route
              path="/"
              exact
              component={() => (
                <ProductList
                  allProducts={products}
                  userCurrency={selectedCurrency}
                  clearMemory={this.clearMemory}
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
