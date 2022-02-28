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

module.exports = {
  getUnitMapping,
  getUnitMapper,
};
