const HEALTH_STATES = ["Indemne", "Blessé", "Mutilé", "Mort"];

const healthChoices = (current) => HEALTH_STATES.map((label, value) => ({
  value,
  label,
  current: value === current
}));

export class SombreZeroActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sombre-classic", "sombre-zero", "sheet", "actor"],
      template: "systems/sombre-classic-house/templates/zero-actor-sheet.hbs",
      width: 680,
      height: 650,
      resizable: true,
      submitOnChange: true,
      closeOnSubmit: false
    });
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    const system = this.actor.system;

    return {
      ...context,
      actor: this.actor,
      system,
      editable: this.isEditable,
      isGM: game.user.isGM,
      canViewSecret: game.user.isGM || this.actor.isOwner,
      hasSecret: Boolean(system.secret),
      isAbility: system.secretKind === "ability",
      healthLabel: HEALTH_STATES[system.health] ?? HEALTH_STATES[0],
      healthChoices: healthChoices(system.health)
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find("[data-zero-health]").on("click", this._onSetHealth.bind(this));
    html.find("[data-zero-roll]").on("click", this._onRoll.bind(this));
    html.find("[data-reveal-secret]").on("click", this._onRevealSecret.bind(this));
    html.find("[data-use-special]").on("click", this._onToggleSpecial.bind(this));
  }

  async _onSetHealth(event) {
    event.preventDefault();
    const health = Number(event.currentTarget.dataset.zeroHealth);
    if (!game.user.isGM && health < Number(this.actor.system.health)) {
      ui.notifications.warn("Seul le MJ peut soigner ou réinitialiser cet état.");
      return;
    }
    await this.actor.update({ "system.health": health });
  }

  async _onRoll(event) {
    event.preventDefault();
    const roll = await new Roll("1d6").evaluate();
    const result = roll.total;
    const level = Number(this.actor.system.level);
    const success = result <= level;
    const isAttack = event.currentTarget.dataset.zeroRoll === "attack";
    const damage = isAttack && success
      ? `<strong class="sombre-damage">${result} Blessure${result > 1 ? "s" : ""}</strong><small>lecture directe du d6</small>`
      : "";
    const outcome = success ? "réussite" : "échec";
    const flavor = [
      `<strong>${this.actor.name}</strong> — ${isAttack ? "attaque" : "action"}`,
      `<span class="sombre-roll ${success ? "success" : "failure"}">`,
      `${result} sous ${level} : <strong>${outcome}</strong>${damage}`,
      "</span>"
    ].join(" ");

    await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor });
  }

  async _onRevealSecret(event) {
    event.preventDefault();
    if (!this.actor.system.secret) return;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="sombre-secret-chat"><strong>${this.actor.name}</strong><p>${foundry.utils.escapeHTML(this.actor.system.secret)}</p></div>`
    });
  }

  async _onToggleSpecial(event) {
    event.preventDefault();
    await this.actor.update({ "system.specialUsed": !this.actor.system.specialUsed });
  }
}
