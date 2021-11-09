const axios = require("axios")
const moment = require("moment")
const {times, get} = require("lodash")

const DATE_FORMAT = 'YYYY-MM-DD'

class ApiClient {
  constructor (apiKey) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.ventrata.com/octo/',
      headers: {Authorization: `Bearer ${apiKey}`}
    })
  }

  async _makeRequest (method, ...other) {
    try {
      const {data} = await this.axiosInstance[method](...other)
      return data
    } catch (error) {
      const data = get(error, 'response.data')
      const message = data && JSON.stringify(data) || error.message
      throw new Error(message)
    }
  }

  getProduct (productId) {
    return this._makeRequest('get', `products/${productId}`)
  }

  getBooking (bookingUuid) {
    return this._makeRequest('get',`bookings/${bookingUuid}`)
  }

  getBookings ({resellerReference, supplierReference, localDate, localDateStart, localDateEnd, productId, optionId}) {
    return this._makeRequest('get',`bookings`, {
      params: {
        resellerReference,
        supplierReference,
        localDate,
        localDateStart,
        localDateEnd,
        productId,
        optionId,
      },
    })
  }

  getCalendar ({productId, optionId, units, localDateStart, localDateEnd}) {
    return this._makeRequest('post',`availability/calendar`, {
      productId,
      optionId,
      localDateStart,
      localDateEnd,
      units,
    })
  }

  getAvailabilities ({productId, optionId, units, localDateStart, localDateEnd}) {
    return this._makeRequest('post',`availability`, {
      productId,
      optionId,
      localDateStart,
      localDateEnd,
      units,
    })
  }

  getMonthCalendar ({productId, optionId, units, year, month}) {
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

  getDateAvailabilities ({productId, optionId, units, month, year, date}) {
    const localDate = moment({year, month, date}).format(DATE_FORMAT)

    return this.getAvailabilities({
      productId,
      optionId,
      localDateStart: localDate,
      localDateEnd: localDate,
      units,
    })
  }

  createBooking ({productId, optionId, availabilityId, units, notes}) {
    return this._makeRequest('post',`/bookings`,
      {
        productId,
        optionId,
        availabilityId,
        notes,
        unitItems: units.reduce((result , unitCounter) => {
          const unitItems = times(unitCounter.quantity, () => ({unitId: unitCounter.id}))
          result.push(...unitItems)
          return result
        }, [])
      }
    )
  }

  confirmBooking ({bookingUuid, emailAddress, fullName, phoneNumber, locales, country}) {
    return this._makeRequest('post',`/bookings/${bookingUuid}/confirm`,
      {
        contact: {
          fullName,
          emailAddress,
          phoneNumber,
          locales,
          country,
        }
      }
    )
  }
}

module.exports = ApiClient
