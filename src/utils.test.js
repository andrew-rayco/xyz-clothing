import { calculateLocalPrice, validateInput } from './utils'
import allProducts from './data/products.json'

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

describe('validateInput', () => {
  test('Validates name', () => {
    // Name must be longer than 3 characters
    let result = validateInput('name', 'Test')
    expect(result).toEqual(true)

    result = validateInput('name', 'Te')
    expect(result).toEqual(false)
  })

  test('Validates id', () => {
    let result = validateInput('id', 6, allProducts, 5)
    expect(result).toEqual(true)

    result = validateInput('id', 1, allProducts, 5)
    expect(result).toEqual(false)
  })

  test('Validates price base', () => {
    let result = validateInput('base', 'USD')
    expect(result).toEqual(true)

    result = validateInput('base', 'Cat')
    expect(result).toEqual(false)
  })

  test('Validates price amount', () => {
    let result = validateInput('amount', 50)
    expect(result).toEqual(true)

    result = validateInput('amount', 0)
    expect(result).toEqual(false)

    result = validateInput('amount', NaN)
    expect(result).toEqual(false)
  })
})
