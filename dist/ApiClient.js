const axios = require("axios")
const axiosRetry = require('axios-retry')
const moment = require("moment")
const {times} = require("lodash")
const {AxiosApiClient} = require("common-utils")

const DATE_FORMAT = 'YYYY-MM-DD'

class ApiClient {
    constructor(apiKey) {
        const axiosInstance = axios.create({
            baseURL: 'https://api.ventrata.com/octo/',
            headers: {Authorization: `Bearer ${apiKey}`}
        })

        axiosRetry(axiosInstance, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
        })

        this.axiosApiClient = AxiosApiClient(axiosInstance)
    }

    getProduct(productId) {
        return this.axiosApiClient.get(`products/${productId}`)
            .then(({data}) => data)
    }

    getBooking(bookingUuid) {
        return this.axiosApiClient.get(`bookings/${bookingUuid}`)
            .then(({data}) => data)
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
        return this.axiosApiClient.get(`bookings`, {
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
        return this.axiosApiClient.post(`availability/calendar`, {
            productId,
            optionId,
            localDateStart,
            localDateEnd,
            units,
        })
            .then(({data}) => data)
    }

    getAvailabilities({productId, optionId, units, localDateStart, localDateEnd}) {
        return this.axiosApiClient.post('post', `availability`, {
            productId,
            optionId,
            localDateStart,
            localDateEnd,
            units,
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

    getDateAvailabilities({productId, optionId, units, month, year, date}) {
        const localDate = moment({year, month, date}).format(DATE_FORMAT)

        return this.getAvailabilities({
            productId,
            optionId,
            localDateStart: localDate,
            localDateEnd: localDate,
            units,
        })
    }

    createBooking({bookingUuid, productId, optionId, availabilityId, units, notes}) {
        return this.axiosApiClient.post(`/bookings`,
            {
                uuid: bookingUuid,
                productId,
                optionId,
                availabilityId,
                notes,
                unitItems: units.reduce((result, unitCounter) => {
                    const unitItems = times(unitCounter.quantity, () => ({unitId: unitCounter.id}))
                    result.push(...unitItems)
                    return result
                }, [])
            }
        )
            .then(({data}) => data)
    }

    confirmBooking({bookingUuid, emailAddress, fullName, phoneNumber, locales, country, resellerReference}) {
        return this.axiosApiClient.post(`/bookings/${bookingUuid}/confirm`,
            {
                contact: {
                    fullName,
                    emailAddress,
                    phoneNumber,
                    locales,
                    country,
                },
                resellerReference,
            }
        )
            .then(({data}) => data)
    }

    updateBooking({bookingUuid, productId, optionId, availabilityId, units, notes}) {
        return this.axiosApiClient.patch(`/bookings/${bookingUuid}`,
            {
                uuid: bookingUuid,
                productId,
                optionId,
                availabilityId,
                notes,
                unitItems: units.reduce((result, unitCounter) => {
                    const unitItems = times(unitCounter.quantity, () => ({unitId: unitCounter.id}))
                    result.push(...unitItems)
                    return result
                }, [])
            }
        )
            .then(({data}) => data)
    }

    cancelBooking({bookingUuid}) {
        return this.axiosApiClient.delete(`/bookings/${bookingUuid}`)
            .then(({data}) => data)
    }
}

module.exports = ApiClient
