const getPricing = require('./getPricing')

function getOriginalPrice(data) {
  const pricing = getPricing(data)

  if (pricing.original === null) {
    throw new Error('Original price is null')
  }

  return pricing.original
}

module.exports = getOriginalPrice
