import { ADVANTAGES, DISADVANTAGES, PERSONALITIES } from "./constants.mjs";

const bodyState = (value) => {
  if (value <= 0) return "Mort";
  if (value <= 4) return "Mutilé";
  if (value <= 8) return "Blessé";
  return "Indemne";
};

const spiritState = (value) => {
  if (value <= 0) return "Fou";
  if (value <= 4) return "Désaxé";
  if (value <= 8) return "Perturbé";
  return "Équilibré";
};

const gauge = (value, max) => Array.from({ length: max + 1 }, (_, level) => ({
  level,
  active: level === value,
  filled: level > 0 && level <= value
}));

const choices = (values, selected, emptyLabel) => [
  ...(emptyLabel ? [{ value: "", label: emptyLabel, selected: !selected }] : []),
  ...values.map((label, index) => ({
    value: String(Array.isArray(label) ? index : label),
    label: Array.isArray(label) ? label.join(" → ") : label,
    selected: String(selected) === String(Array.isArray(label) ? index : label)
  }))
];

export class SombreActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sombre-classic", "sheet", "actor"],
      template: "systems/sombre-classic-house/templates/actor-sheet.hbs",
      width: 760,
      height: 760,
      resizable: true,
      submitOnChange: true,
      closeOnSubmit: false
    });
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    const system = this.actor.system;
    const spirit = system.resources.spirit.value;
    const body = system.resources.body.value;
    const personality = PERSONALITIES[system.personality] ?? PERSONALITIES[0];
    const phaseIndex = spirit >= 9 ? 0 : spirit >= 5 ? 1 : 2;

    return {
      ...context,
      actor: this.actor,
      system,
      editable: this.isEditable,
      personalityChoices: choices(PERSONALITIES, system.personality),
      personalityPhases: personality.map((label, index) => ({
        number: index + 1,
        label,
        current: index === phaseIndex
      })),
      advantageChoices: choices(ADVANTAGES, system.advantage, "Aucun Avantage"),
      disadvantageChoices: choices(DISADVANTAGES, system.disadvantage, "Aucun Désavantage"),
      bodyGauge: gauge(body, system.resources.body.max),
      spiritGauge: gauge(spirit, system.resources.spirit.max),
      adrenalineGauge: gauge(system.resources.adrenaline.value, system.resources.adrenaline.max),
      bodyState: bodyState(body),
      spiritState: spiritState(spirit)
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find("[data-resource][data-value]").on("click", this._onSetResource.bind(this));
    html.find("[data-roll]").on("click", this._onRoll.bind(this));
    html.find("[data-random-personality]").on("click", this._onRandomPersonality.bind(this));
    html.find("[data-random-traits]").on("click", this._onRandomTraits.bind(this));
  }

  async _onSetResource(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const resource = button.dataset.resource;
    const value = Number(button.dataset.value);
    await this.actor.update({ [`system.resources.${resource}.value`]: value });
  }

  async _onRandomPersonality(event) {
    event.preventDefault();
    await this.actor.update({ "system.personality": Math.floor(Math.random() * PERSONALITIES.length) });
  }

  async _onRandomTraits(event) {
    event.preventDefault();
    const advantage = ADVANTAGES[Math.floor(Math.random() * ADVANTAGES.length)];
    const disadvantage = DISADVANTAGES[Math.floor(Math.random() * DISADVANTAGES.length)];
    await this.actor.update({
      "system.advantage": advantage,
      "system.disadvantage": disadvantage
    });
  }

  async _onRoll(event) {
    event.preventDefault();
    const kind = event.currentTarget.dataset.roll;
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });

    if (kind === "damage") {
      const roll = await new Roll("1d6").evaluate();
      await roll.toMessage({ speaker, flavor: `<strong>${this.actor.name}</strong> — dommages` });
      return;
    }

    const ability = event.currentTarget.dataset.ability;
    const target = this.actor.system.resources[ability].value;
    const label = ability === "body" ? "Corps" : "Esprit";
    const formula = kind === "attack" ? "1d20 + 1d6" : "1d20";
    const roll = await new Roll(formula).evaluate();
    const d20 = roll.dice[0].total;
    const success = d20 <= target;
    const damage = kind === "attack" ? roll.dice[1].total : null;
    const detail = damage === null ? "" : ` · d6 : <strong>${damage}</strong>`;
    const flavor = [
      `<strong>${this.actor.name}</strong> — ${kind === "attack" ? "attaque" : `jet d’${label}`}`,
      `<span class="sombre-roll ${success ? "success" : "failure"}">`,
      `${d20} sous ${target} : <strong>${success ? "réussite" : "échec"}</strong>${detail}`,
      "</span>"
    ].join(" ");

    await roll.toMessage({ speaker, flavor });
  }
}
