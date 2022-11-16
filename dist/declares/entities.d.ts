import {AVAILABILITY_STATUSES_UNION, BOOKING_STATUSES_UNION, UNIT_TYPES_UNION} from './consts'
import {Currency} from 'common-utils'

export interface IPricing {
    original: number
    retail: number
    currency: string
}

export interface IOffer {
    code: string
    title: string
}

export interface IAnswer {
    questionId: string
    value: string
}

export interface IUnitItem {
    unitId: string
    unit: IUnit
}

export interface IContact {
    fullName: string
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    locales: string[]
    country: string
}

export interface IOption {
    id: string
    default: boolean
    internalName: string
    reference: string | null
    title: string
    units: IUnit[]
}

export interface IRestriction {
    minAge: number
    maxAge: number
}

export interface IUnit {
    type: UNIT_TYPES_UNION
    id: string
    internalName: string
    reference: string
    restrictions: IRestriction
    title: string
    titlePlural: string
    subtitle: string
    pricingFrom: IPricing[]
}

export interface IProduct {
    id: string
    title: string
    internalName: string
    reference: string
    options: IOption[]
    locale: string
    timeZone: string
}

export interface IReseller {
    name: string
    id: string
}

export interface IBooking {
    supplierReference: string
    resellerReference?: string
    uuid: string
    availabilityId: string
    status: BOOKING_STATUSES_UNION
    contact: IContact
    product: IProduct
    option: IOption,
    unitItems: IUnitItem[]
    pricing: IPricing
    availability: IAvailability
    reseller: IReseller | null
    notes: string
    utcUpdatedAt: string
    utcExpiresAt: string
    utcCreatedAt: string
    offer: IOffer | null
    cardPayment?: CardPayment
}

export interface IAvailability {
    localDateTimeStart: string
    utcCutoffAt: string
    available: boolean
    capacity: number
    status: AVAILABILITY_STATUSES_UNION
    id: string
}

export interface IIdUnitCounter {
    id: string
    quantity: number
}

export interface ITypeUnitCounter {
    type: UNIT_TYPES_UNION
    quantity: number
}

export interface ICombinedUnitCounter {
    id: string
    type: UNIT_TYPES_UNION
    quantity: number
}

/**
 * @deprecated The method should not be used
 */
export interface ITypedUnitCounter extends IIdUnitCounter {
    type: string
}

export interface IUnitItemInput {
    unitId: string
    answerQuestions?: IAnswer[]
}

export interface ICalendarDay {
    available: boolean
    capacity: number
    localDate: string
    status: AVAILABILITY_STATUSES_UNION
    vacancies: number
}

export interface ICalendarDay {
    available: boolean
    capacity: number
    localDate: string
    status: AVAILABILITY_STATUSES_UNION
    vacancies: number
}

export type StripePaymentIntent = {
    id: string
    publishableKey: string,
    clientSecret: string,
    amount: number
    currency: Currency
}

export type StripeSetupIntent = {
    id: string
    publishableKey: string,
    clientSecret: string,
    currency: Currency
}

export type StripeCardPaymentPayload =
  | {paymentIntent: StripePaymentIntent}
  | {setupIntent: StripeSetupIntent}

export type StripeCardPayment = {
    gateway: 'stripe'
    stripe: StripeCardPaymentPayload & {
        version: string
    }
}

export type CardPayment = StripeCardPayment
