const fields = foundry.data.fields;

const resourceField = (initial, max) => new fields.SchemaField({
  value: new fields.NumberField({
    required: true,
    nullable: false,
    integer: true,
    min: 0,
    max,
    initial
  }),
  max: new fields.NumberField({
    required: true,
    nullable: false,
    integer: true,
    min: max,
    max,
    initial: max
  })
});

export class SombreVictimData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      playerName: new fields.StringField({ required: true, nullable: false, initial: "" }),
      profession: new fields.StringField({ required: true, nullable: false, initial: "" }),
      personality: new fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 0,
        max: 23,
        initial: 0
      }),
      advantage: new fields.StringField({ required: true, nullable: false, initial: "" }),
      advantageDescription: new fields.StringField({ required: true, nullable: false, initial: "" }),
      disadvantage: new fields.StringField({ required: true, nullable: false, initial: "" }),
      disadvantageDescription: new fields.StringField({ required: true, nullable: false, initial: "" }),
      resources: new fields.SchemaField({
        body: resourceField(12, 12),
        spirit: resourceField(12, 12),
        adrenaline: resourceField(0, 3)
      }),
      background: new fields.StringField({ required: true, nullable: false, initial: "" }),
      equipment: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
