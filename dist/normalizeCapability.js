const normalizeCapability = (capability) => {
  return capability.startsWith('octo/') ? capability : `octo/${capability}`
}
module.exports = normalizeCapability
