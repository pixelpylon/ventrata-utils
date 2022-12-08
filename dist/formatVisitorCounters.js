const {VISITOR_AGES} = require('./consts')

const ages = [
  {type: VISITOR_AGES.ADULTS, mandatory: true},
  {type: VISITOR_AGES.CHILDREN, mandatory: true},
  {type: VISITOR_AGES.INFANTS, mandatory: false},
  {type: VISITOR_AGES.UNKNOWN, mandatory: false},
]

function formatVisitorCounters(counters) {
  return ages
    .reduce((result, {type, mandatory}) => {
      if (counters[type] === 0 && !mandatory) {
        return result
      }

      return [...result, `${counters[type]} ${type}`]
    }, [])
    .join(' / ')
}

module.exports = formatVisitorCounters
