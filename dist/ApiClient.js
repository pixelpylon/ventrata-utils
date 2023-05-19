const axios = require('axios')
const axiosRetry = require('axios-retry')
const moment = require('moment')
const {isArray} = require('lodash')
const deconvoluteUnitCounters = require('./deconvoluteUnitCounters')
const {AxiosApiClient} = require('back-utils')
const {formatAxiosRequest} = require('common-utils')
const normalizeCapability = require('./normalizeCapability')
const mergeCapabilities = require('./mergeCapabilities')

const DATE_FORMAT = 'YYYY-MM-DD'

const getCapabilitiesHeader = (capabilities) => {
  if (!isArray(capabilities)) {
    throw new Error(`Incorrect capabilities type '${typeof capabilities}'`)
  }

  return capabilities.map(normalizeCapability).join()
}

class ApiClient {
  constructor(apiKey, capabilities, options) {
    this.apiKey = apiKey
    this.capabilities = capabilities
    this.options = options || {}

    const {url, debug, errorInterceptor} = this.options

    const baseURL = url || 'https://api.ventrata.com/octo/'

    const headers = {Authorization: `Bearer ${apiKey}`}

    const capabilitiesHeader = getCapabilitiesHeader(capabilities)

    if (capabilitiesHeader !== null) {
      headers['Octo-Capabilities'] = capabilitiesHeader
    }

    const axiosInstance = axios.create({
      baseURL,
      headers,
    })

    if (debug) {
      axiosInstance.interceptors.response.use((response) => {
        console.log(formatAxiosRequest(response.config, response))
        return response
      })
    }

    axiosRetry(axiosInstance, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    })

    this.axiosApiClient = new AxiosApiClient(axiosInstance, errorInterceptor)
  }

  withCapabilities(extraCapabilities, mode = 'merge') {
    if (!['merge', 'overwrite'].includes(mode)) {
      throw new Error(`Incorrect capabilities applying mode '${mode}'`)
    }

    const capabilities =
      mode === 'overwrite' ? extraCapabilities : mergeCapabilities(this.capabilities, extraCapabilities)
    return new ApiClient(this.apiKey, capabilities, this.options)
  }

  getProducts() {
    return this.axiosApiClient.get('products').then(({data}) => data)
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
    orderId,
    bookingUuid,
    productId,
    optionId,
    availabilityId,
    units,
    unitItems,
    notes,
    questionAnswers,
    offerCode,
    adjustments,
    currency,
  }) {
    if (!units && !unitItems) {
      throw new Error('Unit counters and unit items both are undefined')
    }

    return this.axiosApiClient
      .post(`/bookings`, {
        orderId,
        uuid: bookingUuid,
        productId,
        optionId,
        availabilityId,
        notes,
        unitItems: unitItems || deconvoluteUnitCounters(units),
        questionAnswers,
        offerCode, // Possibly this doesn't work
        adjustments,
        currency,
      })
      .then(({data}) => data)
  }

  confirmBooking({bookingUuid, contact, resellerReference, cardPayment, notes}) {
    return this.axiosApiClient
      .post(`/bookings/${bookingUuid}/confirm`, {
        contact,
        resellerReference,
        cardPayment,
        notes,
      })
      .then(({data}) => data)
  }

  updateBooking({bookingUuid, productId, optionId, availabilityId, units, unitItems, notes, offerCode, adjustments}) {
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
        adjustments,
      })
      .then(({data}) => data)
  }

  cancelBooking(bookingUuid) {
    return this.axiosApiClient.delete(`/bookings/${bookingUuid}`).then(({data}) => data)
  }

  createOrder({currency, expirationMinutes}) {
    return this.axiosApiClient
      .post('/orders', {
        currency,
        expirationMinutes,
      })
      .then(({data}) => data)
  }

  getOrder(args) {
    const {orderId, gatewayId} = typeof args === 'string' ? {orderId: args} : args
    const params = gatewayId ? {gatewayId} : undefined
    return this.axiosApiClient.get('/orders/' + orderId, {params}).then(({data}) => data)
  }

  extendOrder({orderId, expirationMinutes}) {
    return this.axiosApiClient
      .post('/orders/' + orderId + '/extend', {
        expirationMinutes,
      })
      .then(({data}) => data)
  }

  confirmOrder({orderId, contact, cardPayment, notes, gatewayId}) {
    return this.axiosApiClient
      .post(`/orders/${orderId}/confirm`, {
        contact,
        cardPayment,
        notes,
        gatewayId,
      })
      .then(({data}) => data)
  }

  cancelOrder(orderId) {
    return this.axiosApiClient.delete(`/orders/${orderId}`).then(({data}) => data)
  }
}

module.exports = ApiClient
