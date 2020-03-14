import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProductList from './ProductList'

import products from './data/products.json'

export default () => (
  <Router>
    <div className="app">
      <h1>XYZ Clothing</h1>
      <Switch>
        <Route path="/" exact>
          <ProductList products={products} />
        </Route>
      </Switch>
    </div>
  </Router>
)
