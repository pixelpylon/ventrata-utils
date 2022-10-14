const {countBy} = require("lodash")

function getUnitMapping (optionUnits) {
  return optionUnits.reduce((result, unit) => {
    return {...result, [unit.type]: unit.id}
  }, {})
}

function getUnitMapper (optionUnits) {
  const unitMapping = getUnitMapping(optionUnits)

  return function (type) {
    const id = unitMapping[type]
    if (!id) {
      throw new Error(`Unknown unit type '${type}'`)
    }
    return id
  }
}

function idifyUnitCounters(typeUnitCounters, unitMapping) {
  return typeUnitCounters.reduce((result, unitCounter) => {
    const {type, quantity} = unitCounter
    const id = unitMapping[type]

    if (!id) {
      throw new Error(`Unknown unit type '${type}'`)
    }

    result.push({id, quantity, type})
    return result
  }, [])
}

function unitItemsToUnitCounters (unitItems) {
  return unitItems.reduce((counters, unitItem) => {
    const counter = counters.find((counter) => counter.type === unitItem.unit.type)

    if (counter) {
      counter.quantity++
    }
    else {
      counters.push({
        id: unitItem.unit.id,
        type: unitItem.unit.type,
        quantity: 1,
      })
    }

    return counters
  }, [])
}

module.exports = {
  getUnitMapping,
  getUnitMapper,
  unitItemsToUnitCounters,
  idifyUnitCounters,
};
