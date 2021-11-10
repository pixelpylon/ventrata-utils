const getPhone = require('./getPhone');
const countVisitors = require('./countVisitors');
const getEmptyVisitorCounters = require('./getEmptyVisitorCounters');
const formatVisitorCounters = require('./formatVisitorCounters');
const getProductName = require('./getProductName');
const getOptionName = require('./getOptionName');
const getUnitName = require('./getUnitName');
const ApiClient = require('./ApiClient');
const {
  VISITOR_AGES,
  BOOKING_STATUSES,
} = require('./consts');

module.exports = {
  getPhone,
  countVisitors,
  getEmptyVisitorCounters,
  formatVisitorCounters,
  ApiClient,
  VISITOR_AGES,
  BOOKING_STATUSES,
  getProductName,
  getOptionName,
  getUnitName
};
