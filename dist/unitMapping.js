const {countBy} = require("lodash");

function getUnitMapping (product) {
  return product.options[0].units.reduce((result, unit) => {
    return {...result, [unit.type]: unit.id};
  }, {});
}

function getUnitMapper (product) {
  const unitMapping = getUnitMapping(product);
  return function (unitType) {
    const unitId = unitMapping[unitType];
    if (!unitId) {
      throw new Error(`Unknown unit type`);
    }
    return unitId;
  }
}

function adaptUnits (bookingUnitItems, productUnits) {
  const mapping = getUnitMapping(productUnits);
  const counters = countBy(bookingUnitItems, (unitItem) => unitItem.unit.type)

  return Object.entries(counters).reduce((result, [type, quantity]) => {
    result.push({id: mapping[type], quantity})
    return result
  }, [])
}

module.exports = {
  getUnitMapping,
  getUnitMapper,
  adaptUnits,
};
