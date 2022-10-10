const getPhone = require('./getPhone');
const countVisitors = require('./countVisitors');
const getEmptyVisitorCounters = require('./getEmptyVisitorCounters');
const getVisitorCountersWithoutInfants = require('./getVisitorCountersWithoutInfants');
const formatVisitorCounters = require('./formatVisitorCounters');
const getProductName = require('./getProductName');
const getOptionName = require('./getOptionName');
const getUnitName = require('./getUnitName');
const getProductAndOption = require("./getProductAndOption");
const {getUnitMapping, getUnitMapper, unitItemsToUnitCounters, idifyUnitCounters} = require('./unitMapping');
const ApiClient = require('./ApiClient');
const ApiError = require('./ApiError');
const {
  UNIT_TYPES,
  VISITOR_AGES,
  BOOKING_STATUSES,
  AVAILABILITY_STATUSES,
  DEFAULT_OPTION,
} = require('./consts');

const {
  combinedUnitCountersValidator,
  idUnitCountersValidator,
  typeUnitCountersValidator,
} = require('./validators');

module.exports = {
  getPhone,
  countVisitors,
  getEmptyVisitorCounters,
  getVisitorCountersWithoutInfants,
  formatVisitorCounters,
  ApiClient,
  ApiError,
  VISITOR_AGES,
  BOOKING_STATUSES,
  AVAILABILITY_STATUSES,
  UNIT_TYPES,
  DEFAULT_OPTION,
  getProductName,
  getOptionName,
  getUnitName,
  getUnitMapping,
  getUnitMapper,
  idifyUnitCounters,
  unitItemsToUnitCounters,
  getProductAndOption,

  combinedUnitCountersValidator,
  idUnitCountersValidator,
  typeUnitCountersValidator,
};
