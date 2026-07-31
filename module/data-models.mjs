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
      scenarioId: new fields.StringField({ required: true, nullable: false, initial: "house" }),
      playerName: new fields.StringField({ required: true, nullable: false, initial: "" }),
      profession: new fields.StringField({ required: true, nullable: false, initial: "" }),
      nameRandomLocked: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      professionRandomLocked: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      positiveLink: new fields.StringField({ required: true, nullable: false, initial: "" }),
      specialCard: new fields.StringField({ required: true, nullable: false, initial: "" }),
      personality: new fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 0,
        max: 23,
        initial: 0
      }),
      personalityRandomUsed: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      personalityRandomLocked: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      advantage: new fields.StringField({ required: true, nullable: false, initial: "" }),
      advantageDescription: new fields.StringField({ required: true, nullable: false, initial: "" }),
      disadvantage: new fields.StringField({ required: true, nullable: false, initial: "" }),
      disadvantageDescription: new fields.StringField({ required: true, nullable: false, initial: "" }),
      traitsRandomUsed: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      traitsRandomLocked: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      adrenalinePending: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      resources: new fields.SchemaField({
        body: resourceField(12, 12),
        spirit: resourceField(10, 12),
        adrenaline: resourceField(0, 3)
      }),
      background: new fields.StringField({ required: true, nullable: false, initial: "" }),
      equipment: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}

export class SombreZeroData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      scenarioId: new fields.StringField({ required: true, nullable: false, initial: "deep-space-gore" }),
      playerName: new fields.StringField({ required: true, nullable: false, initial: "" }),
      role: new fields.StringField({ required: true, nullable: false, initial: "" }),
      level: new fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 1,
        max: 5,
        initial: 3
      }),
      health: new fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 0,
        max: 3,
        initial: 0
      }),
      weapon: new fields.StringField({ required: true, nullable: false, initial: "" }),
      traits: new fields.StringField({ required: true, nullable: false, initial: "" }),
      secret: new fields.StringField({ required: true, nullable: false, initial: "" }),
      secretKind: new fields.StringField({ required: true, nullable: false, initial: "" }),
      specialUsed: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      infected: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      notes: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
