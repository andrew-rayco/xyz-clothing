import exchangeRates from './data/exchange_rates.json'

export const calculateLocalPrice = (baseCurr, amt, targetCurr) => {
  if (baseCurr === targetCurr) {
    return amt
  } else {
    const baseObject = exchangeRates.find(rate => {
      return baseCurr === rate.base
    })
    return parseFloat(amt * baseObject.rates[targetCurr]).toFixed(2)
  }
}
