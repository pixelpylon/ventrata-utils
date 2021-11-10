function getProductName (product) {
  if (product.title) {
    return product.title
  }

  if (product.internalName) {
    return product.internalName.replace(/\[.+?\]/, '').trim()
  }

  return product.reference
}

module.exports = getProductName
