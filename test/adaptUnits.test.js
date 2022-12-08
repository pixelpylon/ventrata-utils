const expect = require('chai').expect
const {unitItemsToUnitCounters} = require('../dist/unitMapping')

describe('Converting unit items to unit counters', () => {
  it('correct converting', () => {
    const actual = unitItemsToUnitCounters([
      {
        id: '8738fe03-e6ac-48de-8a0f-6fec6e2ed7f7',
        uuid: '6a4ef03a-6d59-4281-8d6e-0ed24b1a6a84',
        resellerReference: null,
        supplierReference: 'TE51P53P',
        unitId: 'unit_16ecdf85-fdf4-4dc6-a168-dd1c131fb4b6',
        unit: {
          id: 'unit_16ecdf85-fdf4-4dc6-a168-dd1c131fb4b6',
          internalName: 'Adults',
          reference: null,
          type: 'ADULT',
        },
      },
      {
        id: '9e08192c-9dbd-4474-b048-4ff285b6bf9e',
        uuid: 'c8b21e38-2c46-49b8-b127-aa4a105908d6',
        resellerReference: null,
        supplierReference: '2956JBEQ',
        unitId: 'unit_7cd73a64-27fc-4f5f-88b2-d8b28272f51d',
        unit: {
          id: 'unit_7cd73a64-27fc-4f5f-88b2-d8b28272f51d',
          internalName: 'Children',
          reference: null,
          type: 'CHILD',
        },
      },
      {
        id: '5d7a88a6-b520-4476-b6b1-2ef8c76f057d',
        uuid: '8869db92-0338-450e-aac9-44208d22bc7b',
        resellerReference: null,
        supplierReference: 'ZKMMK7YW',
        unitId: 'unit_7cd73a64-27fc-4f5f-88b2-d8b28272f51d',
        unit: {
          id: 'unit_7cd73a64-27fc-4f5f-88b2-d8b28272f51d',
          internalName: 'Children',
          reference: null,
          type: 'CHILD',
        },
      },
    ])

    expect(actual).to.eql([
      {
        id: 'unit_16ecdf85-fdf4-4dc6-a168-dd1c131fb4b6',
        quantity: 1,
        type: 'ADULT',
      },
      {
        id: 'unit_7cd73a64-27fc-4f5f-88b2-d8b28272f51d',
        quantity: 2,
        type: 'CHILD',
      },
    ])
  })
})
