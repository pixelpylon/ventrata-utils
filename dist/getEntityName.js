function getEntityName (entity) {
  if (entity.title) {
    return entity.title
  }

  if (entity.internalName) {
    return entity.internalName.replace(/\[.+?\]/, '').trim()
  }

  return entity.reference
}

module.exports = getEntityName
