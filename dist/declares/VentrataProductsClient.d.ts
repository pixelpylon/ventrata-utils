import {RpcClient} from '@exp1/back-utils'
import {ListParams} from '@exp1/common-utils'
import {Location, Option, Product, ProductTours, Tour} from './types/index.d'

export declare class VentrataProductsClient {
  private rpcClient: RpcClient

  fetchProducts(params: ListParams): Promise<Product[]>
  fetchOptions(params: ListParams): Promise<Option[]>
  fetchLocations(params: ListParams): Promise<Location[]>
  fetchProductsTours(params: ListParams): Promise<ProductTours[]>
  fetchTours(params: ListParams): Promise<Tour[]>
  fetchTourByIdPair(productId: string, optionId: string): Promise<Tour>
  constructor(ventrataProductsUrl: string)
}
