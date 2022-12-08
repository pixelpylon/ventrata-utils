import * as Entities from './entities'

type GetCalendar = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  localDateStart: string
  localDateEnd: string
}

type GetMonthCalendar = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  year: number
  month: number
}

type GetAvailabilities = {
  productId: string
  optionId: string
  units?: Entities.IdUnitCounter[]
  localDateStart: string
  localDateEnd: string
  offerCode?: string
}

type GetDateAvailabilities = {
  productId: string
  optionId: string
  units?: Entities.IdUnitCounter[]
  year: number
  month: number
  date: number
  offerCode?: string
}

type GetMonthAvailabilities = {
  productId: string
  optionId: string
  units: Entities.IdUnitCounter[]
  year: number
  month: number
  offerCode?: string
}

type CreateBooking = {
  bookingUuid?: string
  productId: string
  optionId: string
  availabilityId: string
  notes?: string
  questionAnswers?: Entities.Answer[]
  units?: Entities.IdUnitCounter[]
  unitItems?: Entities.UnitItemInput[]
  offerCode?: string
}

type UpdateBooking = {
  bookingUuid: string
  productId?: string
  optionId?: string
  availabilityId?: string
  units?: Entities.IdUnitCounter[]
  unitItems?: Entities.UnitItemInput[]
  notes?: string
  offerCode?: string
}

type CancelBooking = {
  bookingUuid: string
}

type CardPaymentExternalPayload = {
  gateway: 'stripe' | 'external'
  stripe: {paymentIntent: string}
}

type CardPaymentStripePayload = {
  gateway: 'stripe' | 'external'
  stripe: {paymentIntent: string}
}

type CardPaymentPayload = CardPaymentStripePayload | CardPaymentExternalPayload

type CardPayment = CardPaymentPayload & {
  amount: number
  currency: string
  notes?: string
}

type ConfirmBooking = {
  bookingUuid: string
  fullName: string
  emailAddress: string
  phoneNumber: string
  locales: string[]
  country: string
  notes?: string
  resellerReference?: string
  cardPayment?: CardPayment
}

type GetBookings = {
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
  constructor(apiKey: string, options?: {url?: string; capabilities?: string[]})
  getProducts(): Promise<Entities.Product[]>
  getProduct(productId: string): Promise<Entities.Product>
  getBooking(bookingUuid: string): Promise<Entities.Booking>
  getBookings({
    resellerReference,
    supplierReference,
    localDate,
    localDateStart,
    localDateEnd,
    productId,
    optionId,
  }: GetBookings): Promise<Entities.Booking[]>
  getCalendar({productId, optionId, units, localDateStart, localDateEnd}: GetCalendar): Promise<Entities.CalendarDay[]>
  getAvailabilities({
    productId,
    optionId,
    units,
    localDateStart,
    localDateEnd,
    offerCode,
  }: GetAvailabilities): Promise<Entities.Availability[]>
  getMonthCalendar({productId, optionId, units, month, year}: GetMonthCalendar): Promise<Entities.CalendarDay[]>
  getDateAvailabilities({
    productId,
    optionId,
    units,
    month,
    year,
    date,
    offerCode,
  }: GetDateAvailabilities): Promise<Entities.Availability[]>
  getMonthAvailabilities({
    productId,
    optionId,
    units,
    month,
    year,
    offerCode,
  }: GetMonthAvailabilities): Promise<Entities.Availability[]>
  createBooking({
    bookingUuid,
    productId,
    optionId,
    availabilityId,
    units,
    unitItems,
    notes,
    questionAnswers,
    offerCode,
  }: CreateBooking): Promise<Entities.Booking>
  confirmBooking({
    bookingUuid,
    emailAddress,
    fullName,
    phoneNumber,
    locales,
    country,
    resellerReference,
    cardPayment,
    notes,
  }: ConfirmBooking): Promise<Entities.Booking>
  updateBooking({
    bookingUuid,
    productId,
    optionId,
    availabilityId,
    units,
    unitItems,
    notes,
    offerCode,
  }: UpdateBooking): Promise<Entities.Booking>
  cancelBooking({bookingUuid}: CancelBooking): Promise<Entities.Booking>
}
