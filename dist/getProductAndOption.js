const getProductAndOption = async (ventrata, productId, optionId) => {
    const product = await ventrata.getProduct(productId)
    const option = product.options.find((option) => option.id === optionId)

    if (!option) {
        throw new Error(`Can't find option '${optionId}' of product '${productId}'`)
    }

    return {
        product,
        option,
    }
}

module.exports = getProductAndOption
