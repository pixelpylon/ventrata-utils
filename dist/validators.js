const {validate} = require("common-utils")
const {UNIT_TYPES} = require("./consts")

const UNIT_ID_FORMAT = /^unit_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

const typeUnitCountersValidator = validate.items(validate.props({
    type: validate.isIn([UNIT_TYPES.ADULT, UNIT_TYPES.CHILD, UNIT_TYPES.CHILD]),
    quantity: validate.isInt,
}))

const idUnitCountersValidator = validate.items(validate.props({
    id: validate.isFormat(UNIT_ID_FORMAT),
    quantity: validate.isInt,
}))

const combinedUnitCountersValidator = validate.items(validate.props({
    type: validate.isIn([UNIT_TYPES.ADULT, UNIT_TYPES.CHILD, UNIT_TYPES.CHILD]),
    id: validate.isFormat(UNIT_ID_FORMAT),
    quantity: validate.isInt,
}))

module.exports = {
    typeUnitCountersValidator,
    idUnitCountersValidator,
    combinedUnitCountersValidator,
}
