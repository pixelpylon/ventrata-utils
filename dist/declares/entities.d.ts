import {Currency} from 'common-utils'
import {AVAILABILITY_STATUSES_UNION, BOOKING_STATUSES_UNION, ORDER_STATUSES_UNION, UNIT_TYPES_UNION} from './consts'

export type Pricing = {
  original: number
  retail: number
  net: number
  currencyPrecision: number
  currency: Currency
}

export type Offer = {
  code: string
  title: string
}

export type Answer = {
  questionId: string
  value: string
}

export type UnitItemId = {
  unitId: string
}

export type UnitItemInput = {
  unitId: string
  answerQuestions?: Answer[]
}

export type UnitItem = {
  unitId: string
  unit: Unit
}

export type Contact = {
  fullName: string
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  locales: string[]
  country: string
}

export type Option = {
  id: string
  default: boolean
  internalName: string
  reference: string | null
  title: string
  units: Unit[]
}

export type Restriction = {
  minAge: number
  maxAge: number
}

export type Unit = {
  type: UNIT_TYPES_UNION
  id: string
  internalName: string
  reference: string
  restrictions: Restriction
  title: string
  titlePlural: string
  subtitle: string
  pricingFrom: Pricing[]
}

export type Product = {
  id: string
  title: string
  internalName: string
  reference: string
  options: Option[]
  locale: string
  timeZone: string
  coverImageUrl?: string
}

export type Reseller = {
  name: string
  id: string
}

export type Booking = {
  supplierReference: string
  resellerReference?: string
  uuid: string
  availabilityId: string
  status: BOOKING_STATUSES_UNION
  contact: Contact
  product: Product
  option: Option
  unitItems: UnitItem[]
  pricing?: Pricing
  availability: Availability
  reseller: Reseller | null
  notes: string
  utcUpdatedAt: string
  utcExpiresAt: string
  utcCreatedAt: string
  offer: Offer | null
  cardPayment?: CardPayment
  orderId?: string
  primary?: boolean
}

export type Availability = {
  localDateTimeStart: string
  utcCutoffAt: string
  available: boolean
  capacity: number
  status: AVAILABILITY_STATUSES_UNION
  id: string
}

export type IdUnitCounter = {
  id: string
  quantity: number
}

export type TypeUnitCounter = {
  type: UNIT_TYPES_UNION
  quantity: number
}

export type CombinedUnitCounter = {
  id: string
  type: UNIT_TYPES_UNION
  quantity: number
}

export type CalendarDay = {
  available: boolean
  capacity: number
  localDate: string
  status: AVAILABILITY_STATUSES_UNION
  vacancies: number
}

export type StripePaymentIntent = {
  id: string
  publishableKey: string
  clientSecret: string
  amount: number
  currency: Currency
}

export type StripeSetupIntent = {
  id: string
  publishableKey: string
  clientSecret: string
  currency: Currency
}

export type StripeCardPaymentPayload =
  | {paymentIntent: StripePaymentIntent}
  | {setupIntent: StripeSetupIntent}
  | {paymentIntent: StripePaymentIntent; setupIntent: StripeSetupIntent}

export type StripeCardPayment = {
  gateway: 'stripe'
  stripe: StripeCardPaymentPayload & {
    version: string
  }
}

export type CardPayment = StripeCardPayment

export type Traveler = {
  firstName: string
  lastName: string
  age: number
}

export type Order = {
  id: string
  supplierReference: string
  status: ORDER_STATUSES_UNION
  utcExpiresAt: string
  utcConfirmedAt: string
  bookings: Booking[]
  contact: Contact
  cardPayment?: CardPayment
  pricing?: Pricing
}
