import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ handleChange, userCurrency }) => {
  return (
    <div className="header">
      <Link to="/">
        <h1>XYZ Clothing</h1>
      </Link>
      <div>
        <label htmlFor="currency">Currency</label>
        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={userCurrency}
        >
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
          <option value="CNY">CNY</option>
        </select>
      </div>
    </div>
  )
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default Header
