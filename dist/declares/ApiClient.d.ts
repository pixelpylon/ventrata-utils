import {Entities} from "./entities"

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
    units?: Entities.IUnitCounter[]
    localDateStart: string
    localDateEnd: string
}

interface IGetDateAvailabilities {
    productId: string
    optionId: string
    units?: Entities.IUnitCounter[]
    year: number
    month: number
    date: number
}

interface IGetMonthAvailabilities {
    productId: string
    optionId: string
    units: Entities.IUnitCounter[]
    year: number
    month: number
}

interface ICreateBooking {
    bookingUuid?: string
    productId: string
    optionId: string
    availabilityId: string
    units: Entities.IUnitCounter[]
    notes?: string
    answers?: Entities.IAnswer[]
}

interface IUpdateBooking {
    bookingUuid: string
    productId?: string
    optionId?: string
    availabilityId?: string
    units?: Entities.IUnitCounter[]
    notes?: string
}

interface ICancelBooking {
    bookingUuid: string
}

interface ICardPayment {
    gateway: string
    amount: number
    currency: string
    notes?: string
}

interface IConfirmBooking {
    bookingUuid: string
    fullName: string
    emailAddress: string
    phoneNumber: string
    locales: string[]
    country: string
    notes?: string
    resellerReference?: string
    cardPayment?: ICardPayment
}

interface IGetBookings {
    resellerReference?: string
    supplierReference?: string
    localDate?: string
    localDateStart?: string
    localDateEnd?: string
    productId?: string
    optionId?: string
    utcCreatedAtStart?: string
    utcCreatedAtEnd?: string
}

export declare class ApiClient {
    constructor (apiKey: string, url?: string)
    getProduct (productId: string): Promise<Entities.IProduct>
    getBooking (bookingUuid: string): Promise<Entities.IBooking>
    getBookings ({resellerReference, supplierReference, localDate, localDateStart, localDateEnd, productId, optionId}: IGetBookings): Promise<Entities.IBooking[]>
    getCalendar ({productId, optionId, units, localDateStart, localDateEnd}: IGetCalendar): Promise<Entities.ICalendarDay[]>
    getAvailabilities ({productId, optionId, units, localDateStart, localDateEnd}: IGetAvailabilities): Promise<Entities.IAvailability[]>
    getMonthCalendar ({productId, optionId, units, month, year}: IGetMonthCalendar): Promise<Entities.ICalendarDay[]>
    getDateAvailabilities ({productId, optionId, units, month, year, date}: IGetDateAvailabilities): Promise<Entities.IAvailability[]>
    getMonthAvailabilities ({productId, optionId, units, month, year}: IGetMonthAvailabilities): Promise<Entities.IAvailability[]>
    createBooking ({bookingUuid, productId, optionId, availabilityId, units, notes, answers}: ICreateBooking): Promise<Entities.IBooking>
    confirmBooking ({bookingUuid, emailAddress, fullName, phoneNumber, locales, country, resellerReference, cardPayment, notes}: IConfirmBooking): Promise<Entities.IBooking>
    updateBooking ({bookingUuid, productId, optionId, availabilityId, units, notes}: IUpdateBooking): Promise<Entities.IBooking>
    cancelBooking ({bookingUuid}: ICancelBooking): Promise<Entities.IBooking>
}


