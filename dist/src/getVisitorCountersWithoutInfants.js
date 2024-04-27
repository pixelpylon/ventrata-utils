const {VISITOR_AGES} = require('./consts')
const {cloneDeep} = require('lodash')

const getVisitorCountersWithoutInfants = (counters) => {
  const clonedCounters = cloneDeep(counters)
  clonedCounters[VISITOR_AGES.INFANTS] = 0
  return clonedCounters
}

module.exports = getVisitorCountersWithoutInfants
