const getPhone = require('./getPhone')
const countVisitors = require('./countVisitors')
const getEmptyVisitorCounters = require('./getEmptyVisitorCounters')
const getVisitorCountersWithoutInfants = require('./getVisitorCountersWithoutInfants')
const formatVisitorCounters = require('./formatVisitorCounters')
const getProductName = require('./getProductName')
const getOptionName = require('./getOptionName')
const getUnitName = require('./getUnitName')
const getPricing = require('./getPricing')
const getOriginalPrice = require('./getOriginalPrice')
const deconvoluteUnitCounters = require('./deconvoluteUnitCounters')
const mergeUnitItemsWithTravelers = require('./mergeUnitItemsWithTravelers')
const getUnitPrice = require('./getUnitPrice')
const {getUnitMapping, getUnitMapper, unitItemsToUnitCounters, idifyUnitCounters} = require('./unitMapping')
const {UNIT_TYPES, VISITOR_AGES, BOOKING_STATUSES, AVAILABILITY_STATUSES, DEFAULT_OPTION} = require('./consts')

module.exports = {
  getPhone,
  countVisitors,
  getEmptyVisitorCounters,
  getVisitorCountersWithoutInfants,
  formatVisitorCounters,
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
  deconvoluteUnitCounters,
  mergeUnitItemsWithTravelers,
  getPricing,
  getOriginalPrice,
  getUnitPrice,
}
