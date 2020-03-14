import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProductList from './ProductList'
import SingleProduct from './SingleProduct'

import allProducts from '../data/products.json'

export default () => (
  <Router>
    <div className="app">
      <h1>XYZ Clothing</h1>
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
