import {Entities} from '@exp1/ventrata-utils'
import {BaseExtension} from './common.d'

export type CommonExtension = BaseExtension & {
  title?: string
  subtitle?: string
  description?: string
  shortDescription?: string
  durationMin?: number
  tags?: string[]
}

export type Extensions = {
  common?: CommonExtension
}

export type Option = {
  reference: string
  productId: string
  ventrataProductId: string
  ventrataOptionId: string
  isDeleted: boolean
  ventrataOption: Entities.Option
  payloadId: string
  extensions: Extensions
}
