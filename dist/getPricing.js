function getPricing(data) {
  const pricing = data.pricing
  if (!pricing) {
    throw new Error("Can't find pricing")
  }
  return pricing
}

module.exports = getPricing
