import {Currency} from '@exp1/common-utils'
import {SETTLEMENT_METHODS_UNION, UNIT_TYPES_UNION, VISITOR_AGES_UNION} from './consts'
import * as Entities from './entities'

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
  localDateStart: string
  localDateEnd: string
  units?: Entities.IdUnitCounter[]
  offerCode?: string
  currency?: Currency
}

export type GetAvailability = {
  productId: string
  optionId: string
  availabilityId: string
  units?: Entities.IdUnitCounter[]
  offerCode?: string
  currency?: Currency
}

export type GetDateAvailabilities = {
  productId: string
  optionId: string
  year: number
  month: number
  date: number
  units?: Entities.IdUnitCounter[]
  offerCode?: string
  currency?: Currency
}

export type GetMonthAvailabilities = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  year: number
  month: number
  offerCode?: string
  currency?: Currency
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
  emailReceipt?: boolean
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
  adjustments?: Entities.Adjustment[]
  cardPayment?: GiftPayment
  giftPayment?: CardPayment
  emailReceipt?: boolean
}

export type GiftPayment = {
  code: string
}

export type CardPaymentExternalPayload = {
  gateway: 'external'
}

type StripeInfo = {paymentIntent: string} | {setupIntent: string} | {paymentMethod: string}

export type CardPaymentStripePayload = {
  gateway: 'stripe' | string
  stripe: StripeInfo
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

export type UnitMapping = {[key in UNIT_TYPES_UNION]: string}
export type UnitCounterMap = {[key in VISITOR_AGES_UNION]: number}
