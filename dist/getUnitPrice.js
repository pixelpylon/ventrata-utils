function getUnitPrice(unit, currency) {
  if (!unit.pricingFrom) {
    throw new Error(`Can't find 'pricingFrom', unit type '${unit.type}'`)
  }

  const pricingFrom = unit.pricingFrom.find((item) => item.currency === currency)

  if (!pricingFrom) {
    throw new Error(`Can't find 'pricingFrom' item, unit type '${unit.type}', currency '${currency}'`)
  }

  if (pricingFrom.original === undefined || pricingFrom.original === null) {
    throw new Error(`Original price is not defined, unit type '${unit.type}', currency '${currency}'`)
  }

  return pricingFrom.original
}

module.exports = getUnitPrice
