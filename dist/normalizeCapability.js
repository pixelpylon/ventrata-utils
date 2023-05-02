const normalizeCapability = (capability) => {
  if (capability === '*') {
    return '*'
  }
  return capability.startsWith('octo/') ? capability : `octo/${capability}`
}
module.exports = normalizeCapability
