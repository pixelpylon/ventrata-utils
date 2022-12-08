const {parsePhone} = require('common-utils')

const getPhone = (contact) => {
  if (contact.phoneNumber) {
    return contact.phoneNumber
  }

  if (!contact.notes) {
    return null
  }

  return parsePhone(contact.notes)
}

module.exports = getPhone
