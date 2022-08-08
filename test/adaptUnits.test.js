const expect = require("chai").expect;
const {adaptUnits} = require("../dist/unitMapping");

describe('Units adapting', () => {
  it('correct adapting', () => {
    const actual = adaptUnits([
      {
        "unitId": "unit_ae6898d5-f4fd-4916-bec8-7ab15dc29155",
        "unit": {
          "id": "unit_ae6898d5-f4fd-4916-bec8-7ab15dc29155",
          "internalName": "Adult",
          "reference": null,
          "type": "ADULT",
        },
      },
      {
        "unitId": "unit_ae6898d5-f4fd-4916-bec8-7ab15dc29155",
        "unit": {
          "id": "unit_ae6898d5-f4fd-4916-bec8-7ab15dc29155",
          "internalName": "Adult",
          "reference": null,
          "type": "ADULT",
        },
      },
    ],
    [
        {
          "id": "unit_f2d11651-ec01-4317-bcdc-56c6fe348489",
          "type": "ADULT",
        },
        {
          "id": "unit_1e6fa82c-3089-4508-8760-af0aba4b76a8",
          "type": "CHILD",
        },
        {
          "id": "unit_1f475762-db6c-4dd8-8895-9eb9a39c45b3",
          "type": "INFANT",
        }
    ]);

    expect(actual).to.eql([
          {
            id: 'unit_f2d11651-ec01-4317-bcdc-56c6fe348489',
            quantity: 2,
            type: 'ADULT'
          }
        ]
    );
  });
});
