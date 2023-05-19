import {Currency} from 'common-utils'
import {SETTLEMENT_METHODS_UNION} from './consts'
import * as Entities from './entities'
import {Adjustment} from './entities'

export type GetCalendar = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  localDateStart: string
  localDateEnd: string
}

export type GetMonthCalendar = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  year: number
  month: number
}

export type GetAvailabilities = {
  productId: string
  optionId: string
  units?: Entities.IdUnitCounter[]
  localDateStart: string
  localDateEnd: string
  offerCode?: string
}

export type GetDateAvailabilities = {
  productId: string
  optionId: string
  units?: Entities.IdUnitCounter[]
  year: number
  month: number
  date: number
  offerCode?: string
}

export type GetMonthAvailabilities = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  year: number
  month: number
  offerCode?: string
}

export type CreateBooking = {
  orderId?: string
  bookingUuid?: string
  productId: string
  optionId: string
  availabilityId: string
  notes?: string
  questionAnswers?: Entities.Answer[]
  units?: Entities.IdUnitCounter[]
  unitItems?: Entities.UnitItemInput[]
  offerCode?: string
  adjustments?: Entities.Adjustment[]
  currency?: Currency
  settlementMethod?: SETTLEMENT_METHODS_UNION
}

export type UpdateBooking = {
  bookingUuid: string
  productId?: string
  optionId?: string
  availabilityId?: string
  units?: Entities.IdUnitCounter[]
  unitItems?: Entities.UnitItemInput[]
  notes?: string
  offerCode?: string
  adjustments?: Adjustment[]
}

export type CardPaymentExternalPayload = {
  gateway: 'external'
}

export type CardPaymentStripePayload = {
  gateway: 'stripe'
  stripe: {paymentIntent: string} | {setupIntent: string} | {paymentMethod: string}
}

export type CardPaymentPayload = CardPaymentStripePayload | CardPaymentExternalPayload

export type CardPayment = CardPaymentPayload & {
  amount?: number
  currency?: Currency
  notes?: string
}

export type Contact = Omit<Entities.Contact, 'firstName' | 'lastName'>

export type ConfirmBooking = {
  bookingUuid: string
  contact: Contact
  notes?: string
  resellerReference?: string
  cardPayment?: CardPayment
}

export type GetBookings = {
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

export type GetOrder = string | {orderId: string; gatewayId?: string}

export type CreateOrder = {
  currency: Currency
  expirationMinutes: number
  settlementMethod?: SETTLEMENT_METHODS_UNION
}

export type ExtendOrder = {
  orderId: string
  expirationMinutes: number
}

export type ConfirmOrder = {
  orderId: string
  contact: Contact
  notes?: string
  cardPayment?: CardPayment
  gatewayId?: string
}
