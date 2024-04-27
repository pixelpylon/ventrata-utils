import {Currency} from '@exp1/common-utils'
import {UNIT_TYPES_UNION} from './consts'
import * as Entities from './entities'
import {UnitCounterMap, UnitMapping} from './params'

export function getProductName(product: Entities.Product): string
export function getOptionName(option: Entities.Option): string
export function getUnitName(unit: Entities.Unit): string
export function getUnitMapping(optionUnits: Entities.Unit[]): UnitMapping
export function getUnitMapper(optionUnits: Entities.Unit[]): (type: UNIT_TYPES_UNION) => string
export function idifyUnitCounters(
  typeUnitCounters: Entities.TypeUnitCounter[],
  unitMapping: UnitMapping
): Entities.CombinedUnitCounter[]
export function unitItemsToUnitCounters(unitItems: Entities.UnitItem[]): Entities.CombinedUnitCounter[]
export function getEmptyVisitorCounters(): UnitCounterMap
export function countVisitors(booking: Entities.Booking): UnitCounterMap
export function getVisitorCountersWithoutInfants(counters: UnitCounterMap): UnitCounterMap
export function formatVisitorCounters(counters: UnitCounterMap): string
export function deconvoluteUnitCounters(unitCounters: Entities.IdUnitCounter[]): Entities.UnitItemId[]
export function mergeUnitItemsWithTravelers(
  unitItems: Entities.UnitItemId[],
  travelers: Entities.Traveler[],
  travelersInfoQuestionId: string
): Entities.UnitItemInput[]
export function getPricing(data: Entities.Booking | Entities.Order): Entities.Pricing
export function getOriginalPrice(data: Entities.Booking | Entities.Order): number
export function getUnitPrice(unit: Entities.Unit, currency: Currency): number
