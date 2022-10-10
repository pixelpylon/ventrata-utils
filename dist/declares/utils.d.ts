import {Entities} from './entities'
import {UNIT_TYPES_UNION, VISITOR_AGES_UNION} from "./consts";
import {ApiClient} from "./ApiClient";

export type UnitMapping = {[key in UNIT_TYPES_UNION]: string}

export function getProductName (product: Entities.IProduct): string
export function getOptionName (option: Entities.IOption): string
export function getUnitName (unit: Entities.IUnit): string
export function getUnitMapping (optionUnits: Entities.IUnit[]): UnitMapping
export function getUnitMapper (optionUnits: Entities.IUnit[]): (type: UNIT_TYPES_UNION) => string
export function idifyUnitCounters (typeUnitCounters: Entities.ITypeUnitCounter[], unitMapping: UnitMapping): Entities.ICombinedUnitCounter[]
export function unitItemsToUnitCounters (unitItems: Entities.IUnitItem[]): Entities.ICombinedUnitCounter[]
export function getEmptyVisitorCounters (): {[key in VISITOR_AGES_UNION]: number}
export function countVisitors (booking: Entities.IBooking): {[key in VISITOR_AGES_UNION]: number}
export function getVisitorCountersWithoutInfants (booking: Entities.IBooking): {[key in VISITOR_AGES_UNION]: number}
export function formatVisitorCounters (counters: {[key in VISITOR_AGES_UNION]: number}): string
export function getProductAndOption (ventrata: ApiClient, productId: string, optionId: string): Promise<{product: Entities.IProduct, option: Entities.IOption}>
