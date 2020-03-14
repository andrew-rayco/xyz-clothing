import { calculateLocalPrice } from './utils'

test('calculateLocalPrice rate calculations are correct', () => {
  // Convert 50 AUD to USD
  let expected = (50 * 0.72).toFixed(2)
  let result = calculateLocalPrice('AUD', 50, 'USD')
  expect(result).toEqual(expected)

  // Convert 10 USD to CNY
  expected = (10 * 6.77).toFixed(2)
  result = calculateLocalPrice('USD', 10, 'CNY')
  expect(result).toEqual(expected)

  // Convert 123 CNY to AUD
  expected = (123 * 0.21).toFixed(2)
  result = calculateLocalPrice('CNY', 123, 'AUD')
  expect(result).toEqual(expected)

  // Convert 300 CNY to AUD
  expected = (300 * 0.21).toFixed(2)
  result = calculateLocalPrice('CNY', 300, 'AUD')
})
