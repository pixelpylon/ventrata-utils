const {validate} = require("common-utils")
const {UNIT_TYPES} = require("./consts")

const typeUnitCountersValidator = validate.items(validate.props({
    type: validate.isIn([UNIT_TYPES.ADULT, UNIT_TYPES.CHILD, UNIT_TYPES.CHILD]),
    quantity: validate.isInt,
}))

const idUnitCountersValidator = validate.items(validate.props({
    id: validate.isUuid,
    quantity: validate.isInt,
}))

const combinedUnitCountersValidator = validate.items(validate.props({
    type: validate.isIn([UNIT_TYPES.ADULT, UNIT_TYPES.CHILD, UNIT_TYPES.CHILD]),
    id: validate.isUuid,
    quantity: validate.isInt,
}))

module.exports = {
    typeUnitCountersValidator,
    idUnitCountersValidator,
    combinedUnitCountersValidator,
}
