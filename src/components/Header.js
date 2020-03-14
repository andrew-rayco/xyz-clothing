import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const selectOptions = [
  { value: 'AUD', label: 'AUD' },
  { value: 'USD', label: 'USD' },
  { value: 'CNY', label: 'CNY' }
]

const Header = ({ handleChange, userCurrency }) => {
  return (
    <div className="header">
      <Link to="/">
        <h1>XYZ Clothing</h1>
      </Link>
      <div className="currency-select">
        <Select
          value={{ value: userCurrency, label: userCurrency }}
          onChange={e => handleChange(e)}
          options={selectOptions}
          className={'rs-container'}
          classNamePrefix={'rs'}
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  userCurrency: PropTypes.string.isRequired
}

export default Header
