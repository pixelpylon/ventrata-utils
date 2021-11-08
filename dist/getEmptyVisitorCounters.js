const {EMPTY_VISITOR_COUNTERS} = require("./consts");
const {cloneDeep} = require("lodash");

const getEmptyVisitorCounters = () => {
  return cloneDeep(EMPTY_VISITOR_COUNTERS);
};

module.exports = getEmptyVisitorCounters;
