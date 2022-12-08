const axios = require('axios')
const axiosRetry = require('axios-retry')
const moment = require('moment')
const {isArray} = require('lodash')
const {AxiosApiClient} = require('common-utils')
const deconvoluteUnitCounters = require('./deconvoluteUnitCounters')

const DATE_FORMAT = 'YYYY-MM-DD'

class ApiClient {
  constructor(apiKey, options) {
    const {url, capabilities} = options || {}

    const baseURL = url || 'https://api.ventrata.com/octo/'

    const headers = {Authorization: `Bearer ${apiKey}`}

    if (isArray(capabilities) && capabilities.length > 0) {
      headers['Octo-Capabilities'] = capabilities.join(', ')
    }

    const axiosInstance = axios.create({
      baseURL,
      headers,
    })

    axiosRetry(axiosInstance, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    })

    this.axiosApiClient = AxiosApiClient(axiosInstance)
  }

  getProducts() {
    return this.axiosApiClient.get(`products`).then(({data}) => data)
  }

  getProduct(productId) {
    return this.axiosApiClient.get(`products/${productId}`).then(({data}) => data)
  }

  getBooking(bookingUuid) {
    return this.axiosApiClient.get(`bookings/${bookingUuid}`).then(({data}) => data)
  }

  getBookings({
    resellerReference,
    supplierReference,
    localDate,
    localDateStart,
    localDateEnd,
    productId,
    optionId,
    utcCreatedAtStart,
    utcCreatedAtEnd,
  }) {
    return this.axiosApiClient
      .get(`bookings`, {
        params: {
          resellerReference,
          supplierReference,
          localDate,
          localDateStart,
          localDateEnd,
          productId,
          optionId,
          utcCreatedAtStart,
          utcCreatedAtEnd,
        },
      })
      .then(({data}) => data)
  }

  getCalendar({productId, optionId, units, localDateStart, localDateEnd}) {
    return this.axiosApiClient
      .post(`availability/calendar`, {
        productId,
        optionId,
        localDateStart,
        localDateEnd,
        units,
      })
      .then(({data}) => data)
  }

  getAvailabilities({productId, optionId, units, localDateStart, localDateEnd, offerCode}) {
    return this.axiosApiClient
      .post(`availability`, {
        productId,
        optionId,
        localDateStart,
        localDateEnd,
        units,
        offerCode,
      })
      .then(({data}) => data)
  }

  getMonthCalendar({productId, optionId, units, year, month}) {
    const startDate = moment({year, month, date: 1})
    const endDate = moment({year, month, date: startDate.daysInMonth()})

    return this.getCalendar({
      productId,
      optionId,
      localDateStart: startDate.format(DATE_FORMAT),
      localDateEnd: endDate.format(DATE_FORMAT),
      units,
    })
  }

  getMonthAvailabilities({productId, optionId, units, year, month, offerCode}) {
    const startDate = moment({year, month, date: 1})
    const endDate = moment({year, month, date: startDate.daysInMonth()})

    return this.getAvailabilities({
      productId,
      optionId,
      localDateStart: startDate.format(DATE_FORMAT),
      localDateEnd: endDate.format(DATE_FORMAT),
      units,
      offerCode,
    })
  }

  getDateAvailabilities({productId, optionId, units, month, year, date, offerCode}) {
    const localDate = moment({year, month, date}).format(DATE_FORMAT)

    return this.getAvailabilities({
      productId,
      optionId,
      localDateStart: localDate,
      localDateEnd: localDate,
      units,
      offerCode,
    })
  }

  createBooking({
    bookingUuid,
    productId,
    optionId,
    availabilityId,
    units,
    unitItems,
    notes,
    questionAnswers,
    offerCode,
  }) {
    if (!units && !unitItems) {
      throw new Error('Unit counters and unit items both are undefined')
    }

    return this.axiosApiClient
      .post(`/bookings`, {
        uuid: bookingUuid,
        productId,
        optionId,
        availabilityId,
        notes,
        unitItems: unitItems || deconvoluteUnitCounters(units),
        questionAnswers,
        offerCode, // Possibly this doesn't work
      })
      .then(({data}) => data)
  }

  confirmBooking({
    bookingUuid,
    emailAddress,
    fullName,
    phoneNumber,
    locales,
    country,
    resellerReference,
    cardPayment,
    notes,
  }) {
    return this.axiosApiClient
      .post(`/bookings/${bookingUuid}/confirm`, {
        contact: {
          fullName,
          emailAddress,
          phoneNumber,
          locales,
          country,
        },
        resellerReference,
        cardPayment,
        notes,
      })
      .then(({data}) => data)
  }

  updateBooking({bookingUuid, productId, optionId, availabilityId, units, unitItems, notes, offerCode}) {
    const getUnitItems = () => {
      if (unitItems) {
        return unitItems
      }

      if (units) {
        return deconvoluteUnitCounters(units)
      }

      return undefined
    }

    return this.axiosApiClient
      .patch(`/bookings/${bookingUuid}`, {
        uuid: bookingUuid,
        productId,
        optionId,
        availabilityId,
        notes,
        unitItems: getUnitItems(),
        offerCode,
      })
      .then(({data}) => data)
  }

  cancelBooking({bookingUuid}) {
    return this.axiosApiClient.delete(`/bookings/${bookingUuid}`).then(({data}) => data)
  }
}

module.exports = ApiClient
