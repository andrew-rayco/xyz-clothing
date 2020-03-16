import exchangeRates from './data/exchange_rates.json'

export const calculateLocalPrice = (baseCurr, amt, targetCurr) => {
  if (baseCurr === targetCurr) {
    return amt.toFixed(2)
  } else {
    const baseObject = exchangeRates.find(rate => {
      return baseCurr === rate.base
    })
    return parseFloat(amt * baseObject.rates[targetCurr]).toFixed(2)
  }
}

export const validateInput = (name, value, allProducts, productId) => {
  if (name === 'name') {
    return value.length >= 3
  } else if (name === 'id') {
    let valid = true
    allProducts.forEach(prod => {
      if (prod.id === value && value !== productId) {
        valid = false
      }
    })
    return valid
  } else if (name === 'base') {
    return value.length > 0
  } else if (name === 'amount') {
    return value !== NaN && value > 0
  }
}
