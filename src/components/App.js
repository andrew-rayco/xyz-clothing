import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProductList from './ProductList'
import SingleProduct from './SingleProduct'
import Header from './Header'

import allProducts from '../data/products.json'
import '../scss/index.scss'

class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedCurrency: 'AUD'
    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route
              path="/products/:id"
              component={({ match }) => (
                <SingleProduct
                  productId={parseInt(match.params.id)}
                  allProducts={allProducts}
                />
              )}
            />
            <Route
              path="/"
              exact
              component={() => <ProductList allProducts={allProducts} />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
