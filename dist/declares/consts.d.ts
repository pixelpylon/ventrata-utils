export declare const BOOKING_STATUSES: {
  CANCELLED: 'CANCELLED'
  CONFIRMED: 'CONFIRMED'
  REDEEMED: 'REDEEMED'
  ON_HOLD: 'ON_HOLD'
  EXPIRED: 'EXPIRED'
}
export declare const ORDER_STATUSES: {
  CANCELLED: 'CANCELLED'
  CONFIRMED: 'CONFIRMED'
  ON_HOLD: 'ON_HOLD'
  EXPIRED: 'EXPIRED'
}
export declare const AVAILABILITY_STATUSES: {
  AVAILABLE: 'AVAILABLE'
  CLOSED: 'CLOSED'
  SOLD_OUT: 'SOLD_OUT'
  FREESALE: 'FREESALE'
  LIMITED: 'LIMITED'
}
export declare const UNIT_TYPES: {ADULT: 'ADULT'; CHILD: 'CHILD'; INFANT: 'INFANT'}
export declare const VISITOR_AGES: {ADULTS: 'ADULTS'; CHILDREN: 'CHILDREN'; INFANTS: 'INFANTS'; UNKNOWN: 'UNKNOWN'}
export declare const SETTLEMENT_METHODS: {
  DIRECT: 'DIRECT'
  VOUCHER: 'VOUCHER'
  WHOLESALE: 'WHOLESALE'
  DEPOSIT: 'DEPOSIT'
  DEFERRED: 'DEFERRED'
}

export declare const NET_DISCOUNTS: {
  NONE: 'NONE'
  FULL: 'FULL'
  SPLIT: 'SPLIT'
  PRO_RATA: 'PRO_RATA'
}

export declare const DEFAULT_OPTION: string

export type BOOKING_STATUSES_UNION = keyof typeof BOOKING_STATUSES
export type ORDER_STATUSES_UNION = keyof typeof ORDER_STATUSES
export type AVAILABILITY_STATUSES_UNION = keyof typeof AVAILABILITY_STATUSES
export type UNIT_TYPES_UNION = keyof typeof UNIT_TYPES
export type VISITOR_AGES_UNION = keyof typeof VISITOR_AGES
export type SETTLEMENT_METHODS_UNION = keyof typeof SETTLEMENT_METHODS
export type NET_DISCOUNTS_UNION = keyof typeof NET_DISCOUNTS
