import {AxiosApiClient} from 'back-utils'
import * as Entities from './entities'
import * as Params from './params'

export declare class ApiClient {
  public readonly axiosApiClient: AxiosApiClient

  constructor(
    apiKey: string,
    options?: {url?: string; capabilities?: string[]; debug?: boolean; errorInterceptor?: (error: any) => void}
  )

  getProducts(): Promise<Entities.Product[]>

  getProduct(productId: string): Promise<Entities.Product>

  getBooking(bookingUuid: string): Promise<Entities.Booking>

  getBookings(params: Params.GetBookings): Promise<Entities.Booking[]>

  getCalendar(params: Params.GetCalendar): Promise<Entities.CalendarDay[]>

  getAvailabilities(params: Params.GetAvailabilities): Promise<Entities.Availability[]>

  getMonthCalendar(params: Params.GetMonthCalendar): Promise<Entities.CalendarDay[]>

  getDateAvailabilities(params: Params.GetDateAvailabilities): Promise<Entities.Availability[]>

  getMonthAvailabilities(params: Params.GetMonthAvailabilities): Promise<Entities.Availability[]>

  createBooking(params: Params.CreateBooking): Promise<Entities.Booking>

  confirmBooking(params: Params.ConfirmBooking): Promise<Entities.Booking>

  updateBooking(params: Params.UpdateBooking): Promise<Entities.Booking>

  cancelBooking(bookingUuid: string): Promise<Entities.Booking>

  createOrder(params: Params.CreateOrder): Promise<Entities.Order>

  getOrder(orderId: string): Promise<Entities.Order>

  extendOrder(params: Params.ExtendOrder): Promise<Entities.Order>

  confirmOrder(params: Params.ConfirmOrder): Promise<Entities.Order>

  cancelOrder(orderId: string): Promise<Entities.Order>
}
