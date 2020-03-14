import React from 'react'

const Header = () => {
  return (
    <div className="header">
      <h1>XYZ Clothing</h1>
      <label htmlFor="currency">Currency</label>
      <select name="currency" id="currency">
        <option value="AUD">AUD</option>
        <option value="USD">USD</option>
        <option value="CNY">CNY</option>
      </select>
    </div>
  )
}

export default Header
