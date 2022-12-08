const {times} = require('lodash')

const deconvoluteUnitCounters = (unitCounters) => {
  return unitCounters.reduce((result, unitCounter) => {
    const unitItems = times(unitCounter.quantity, () => ({unitId: unitCounter.id}))
    result.push(...unitItems)
    return result
  }, [])
}

module.exports = deconvoluteUnitCounters
