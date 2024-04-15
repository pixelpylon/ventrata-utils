const {RpcClient, chunkFilter} = require('@exp1/back-utils')
const {groupBy, map} = require('lodash')

class VentrataProductsClient {
  fetchProducts(params) {
    return this.rpcClient.unsafeCall('/ventrataProducts/api/rpc/v2/fetchProducts', params)
  }

  fetchOptions(params) {
    return this.rpcClient.unsafeCall('/ventrataProducts/api/rpc/v2/fetchOptions', params)
  }

  fetchLocations(params) {
    return this.rpcClient.unsafeCall('/ventrataProducts/api/rpc/v2/fetchLocations', params)
  }

  async fetchProductsTours(params) {
    const products = await this.fetchProducts(params)
    const productIds = map(products, 'ventrataProductId')

    const options = await this.fetchOptions({
      parallel: chunkFilter({field: 'ventrataProductId', value: productIds, op: 'in'}),
      filters: [{field: 'isDeleted', value: false}],
    })

    const optionGroups = groupBy(options, 'ventrataProductId')

    const result = []

    for (const product of products) {
      const options = optionGroups[product.ventrataProductId]

      if (!options || options.length === 0) {
        console.warn(`Option list is empty, product reference '${product.reference}'`)
        continue
      }

      result.push({
        product,
        options: optionGroups[product.ventrataProductId],
      })
    }

    return result
  }

  async fetchTours(params) {
    const productsTours = await this.fetchProductsTours(params)

    const result = []

    for (const {product, options} of productsTours) {
      for (const option of options) {
        result.push({product, option})
      }
    }

    return result
  }

  async fetchTourByIdPair(productId, optionId) {
    const [products, options] = await Promise.all([
      this.fetchProducts({filters: [{field: 'ventrataProductId', value: productId}], limit: 1}),
      this.fetchOptions({
        filters: [
          {field: 'ventrataProductId', value: productId},
          {field: 'ventrataOptionId', value: optionId},
        ],
        limit: 1,
      }),
    ])

    if (products.length === 0 || options.length === 0) {
      return null
    }

    return {
      product: products[0],
      option: options[0],
    }
  }

  constructor(ventrataProductsUrl) {
    this.rpcClient = new RpcClient(ventrataProductsUrl)
  }
}

module.exports = {
  VentrataProductsClient,
}
