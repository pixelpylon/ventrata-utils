import {ApiClient, Capability} from './ApiClient'
import * as Entities from './entities'
import {UNIT_TYPES, VISITOR_AGES} from './types'

export type UnitMapping = {[key in UNIT_TYPES]: string}

export function getProductName(product: Entities.Product): string
export function getOptionName(option: Entities.Option): string
export function getUnitName(unit: Entities.Unit): string
export function getUnitMapping(optionUnits: Entities.Unit[]): UnitMapping
export function getUnitMapper(optionUnits: Entities.Unit[]): (type: UNIT_TYPES) => string
export function idifyUnitCounters(
  typeUnitCounters: Entities.TypeUnitCounter[],
  unitMapping: UnitMapping
): Entities.CombinedUnitCounter[]
export function unitItemsToUnitCounters(unitItems: Entities.UnitItem[]): Entities.CombinedUnitCounter[]
export function getEmptyVisitorCounters(): {[key in VISITOR_AGES]: number}
export function countVisitors(booking: Entities.Booking): {[key in VISITOR_AGES]: number}
export function getVisitorCountersWithoutInfants(booking: Entities.Booking): {[key in VISITOR_AGES]: number}
export function formatVisitorCounters(counters: {[key in VISITOR_AGES]: number}): string
export function getProductAndOption(
  ventrata: ApiClient,
  productId: string,
  optionId: string
): Promise<{product: Entities.Product; option: Entities.Option}>
export function deconvoluteUnitCounters(unitCounters: Entities.IdUnitCounter[]): Entities.UnitItemId[]
export function mergeUnitItemsWithTravelers(
  unitItems: Entities.UnitItemId[],
  travelers: Entities.Traveler[],
  travelersInfoQuestionId: string
): Entities.UnitItemInput[]
export function getPricing(data: Entities.Booking | Entities.Order): Entities.Pricing
export function getOriginalPrice(data: Entities.Booking | Entities.Order): number
export function normalizeCapability(capability: Capability): Capability
export function mergeCapabilities(list1: Capability[], list2: Capability[]): Capability[]
