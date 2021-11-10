function getOptionName (option) {
  if (option.title) {
    return option.title
  }

  if (option.internalName) {
    return option.internalName.replace(/\[.+?\]/, '').trim()
  }

  return option.reference
}

module.exports = getOptionName
