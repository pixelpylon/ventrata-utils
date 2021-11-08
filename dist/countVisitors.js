const getEmptyCounters = require("./getEmptyVisitorCounters");
const {VISITOR_AGES} = require("./consts");

const adaptType = (type) => {
  switch (type) {
    case 'ADULT':
      return VISITOR_AGES.ADULTS;
    case 'CHILD':
      return VISITOR_AGES.CHILDREN;
    case 'INFANT':
      return VISITOR_AGES.INFANTS;
    default:
      return VISITOR_AGES.UNKNOWN;
  }
};

const countVisitors = (booking) => {
  return booking.unitItems.reduce(
    (result, lineItem) => {
      const type = adaptType(lineItem.unit.type);
      return {
        ...result,
        [type]: result[type] + 1,
      }
    },
    getEmptyCounters()
  );
};

module.exports = countVisitors;
