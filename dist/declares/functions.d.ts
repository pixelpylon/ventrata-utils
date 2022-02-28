import {Entities} from "./entities";
import {UNIT_TYPES_UNION} from "./consts";

export function getProductName (product: Entities.IProduct): string
export function getOptionName (option: Entities.IOption): string
export function getUnitName (unit: Entities.IUnit): string
export function getUnitMapping (product: Entities.IProduct): {[key in UNIT_TYPES_UNION]: string}
export function getUnitMapper (product: Entities.IProduct): (type: UNIT_TYPES_UNION) => string
