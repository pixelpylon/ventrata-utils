function getUnitMapping (product) {
  return product.options[0].units.reduce((result, unit) => {
    return {...result, [unit.type]: unit.id};
  }, {});
}

module.exports = getUnitMapping;
