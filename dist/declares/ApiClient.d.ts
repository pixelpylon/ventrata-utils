import {Entities} from "./entities";

interface IGetCalendar {
    productId: string
    optionId: string
    units: Entities.IUnitCounter[]
    localDateStart: string
    localDateEnd: string
}

interface IGetMonthCalendar {
    productId: string
    optionId: string
    units: Entities.IUnitCounter[]
    year: number
    month: number
}

interface IGetAvailabilities {
    productId: string
    optionId: string
    units: Entities.IUnitCounter[]
    localDateStart: string
    localDateEnd: string
}

interface IGetDateAvailabilities {
    productId: string
    optionId: string
    units: Entities.IUnitCounter[]
    year: number
    month: number
    date: number
}

interface ICreateBooking {
    productId: string
    optionId: string
    availabilityId: string
    units: Entities.IUnitCounter[]
    notes?: string
}

interface IConfirmBooking {
    bookingUuid: string
    fullName: string
    emailAddress: string
    phoneNumber: string
    locales: string[]
    country: string
}

export declare class ApiClient {
    constructor (apiKey: string)
    getProduct (productId: string): Promise<Entities.IProduct>
    getBooking (bookingUuid: string): Promise<Entities.IBooking>
    getCalendar ({productId, optionId, units, localDateStart, localDateEnd}: IGetCalendar): Promise<Entities.ICalendarDay[]>
    getAvailabilities ({productId, optionId, units, localDateStart, localDateEnd}: IGetAvailabilities): Promise<Entities.ICalendarDay[]>
    getMonthCalendar ({productId, optionId, units, month, year}: IGetMonthCalendar): Promise<Entities.ICalendarDay[]>
    getDateAvailabilities ({productId, optionId, units, month, year}: IGetDateAvailabilities): Promise<Entities.ICalendarDay>
    createBooking ({productId, optionId, availabilityId, units, notes}: ICreateBooking): Promise<Entities.IBooking>
    confirmBooking ({bookingUuid, emailAddress, fullName, phoneNumber, locales, country}: IConfirmBooking): Promise<Entities.IBooking>
}


