import {Entities} from '@exp1/ventrata-utils'
import {BaseExtension} from './common.d'

export type CommonExtension = BaseExtension & {
  capacity?: number
  tags?: string[]
}

export type AnalyticsExtension = BaseExtension & {
  collectData?: boolean
}

export type Extensions = {
  common?: CommonExtension
  analytics?: AnalyticsExtension
}

export type Product = {
  reference: string
  ventrataProductId: string
  isDeleted: boolean
  ventrataProduct: Omit<Entities.Product, 'options'>
  payloadId: string
  locationId: string
  extensions: Extensions
}
