const normalizeCapability = require('./normalizeCapability')

const mergeCapabilities = (list1, list2) => {
  return list2.map(normalizeCapability).reduce((result, capability) => {
    return result.includes(capability) ? result : [...result, capability]
  }, list1.map(normalizeCapability))
}
module.exports = mergeCapabilities
