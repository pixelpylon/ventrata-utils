import {BaseExtension} from './common.d'

export type Ventrata2CalendarExtension = BaseExtension & {
  bookingCalendarId?: string
  guideCalendarId?: string
}

export type Extensions = {
  ventrata2calendar?: Ventrata2CalendarExtension
}

export type Location = {
  code: string
  name: string
  timeZone: string
  isDisabled: boolean
  extensions: Extensions
}
