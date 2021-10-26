const axios = require("axios")
const moment = require("moment")
const {times} = require("lodash")

const DATE_FORMAT = 'YYYY-MM-DD'

class ApiClient {
  constructor (apiKey) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.ventrata.com/octo/',
      headers: {Authorization: `Bearer ${apiKey}`}
    })
  }

  async getProduct (productId) {
    const {data: product} = await this.axiosInstance.get(`products/${productId}`)
    return product
  }

  async getBooking (bookingUuid) {
    const {data: booking} = await this.axiosInstance.get(`bookings/${bookingUuid}`)
    return booking
  }

  async getCalendar ({productId, optionId, units, localDateStart, localDateEnd}) {
    const {data: calendar} = await this.axiosInstance.post(`availability/calendar`, {
      productId,
      optionId,
      localDateStart,
      localDateEnd,
      units,
    })

    return calendar
  }

  async getAvailabilities ({productId, optionId, units, localDateStart, localDateEnd}) {
    const {data: availabilities} = await this.axiosInstance.post(`availability`, {
      productId,
      optionId,
      localDateStart,
      localDateEnd,
      units,
    })

    return availabilities
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

  async createBooking ({productId, optionId, availabilityId, units, notes}) {
    const {data: booking} = await this.axiosInstance.post(`/bookings`,
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

    return booking
  }

  async confirmBooking ({bookingUuid, emailAddress, fullName, phoneNumber, locales, country}) {
    const {data: booking} = await this.axiosInstance.post(`/bookings/${bookingUuid}/confirm`,
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

    return booking
  }
}

module.exports = ApiClient
