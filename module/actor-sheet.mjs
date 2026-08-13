import {
  ADVANTAGES,
  DISADVANTAGES,
  FIRST_NAMES,
  LAST_NAMES,
  PERSONALITIES,
  PROFESSIONS,
  SPECIAL_CARDS,
  TRAIT_HELP
} from "./constants.mjs";
import { PERSONALITY_HELP } from "./personality-help.mjs";

const bodyState = (value) => {
  if (value <= 0) return "Mort";
  if (value <= 4) return "Mutilé";
  if (value <= 8) return "Blessé";
  return "Indemne";
};

const adrenalineUnlocked = (body) => {
  if (body <= 4) return 3;
  if (body <= 8) return 2;
  return 1;
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
    this._activeTab ??= "main";
    const system = this.actor.system;
    const scenarioLabels = {
      house: "Sombre Classic · House of the Rising Dead",
      ubiquite: "Sombre Classic · Ubiquité",
      "deep-space-gore": "Sombre Classic · Deep Space Gore",
      "roche-noire": "Sombre Classic · La Roche-Noire"
    };
    const scenarioLabel = scenarioLabels[system.scenarioId] ?? "Sombre Classic";
    const isHouse = system.scenarioId === "house";
    const spirit = system.resources.spirit.value;
    const body = system.resources.body.value;
    const isAntagonist = Boolean(system.isAntagonist);
    const personality = PERSONALITIES[system.personality] ?? PERSONALITIES[0];
    const phaseIndex = spirit >= 9 ? 0 : spirit >= 5 ? 1 : 2;
    const unlockedAdrenaline = adrenalineUnlocked(body);
    const checkedAdrenaline = system.resources.adrenaline.value;
    const adrenalinePending = Boolean(system.adrenalinePending);
    const adrenalineUnlockStates = ["", "Indemne", "Blessé", "Mutilé"];
    const adrenalineGauge = gauge(checkedAdrenaline, system.resources.adrenaline.max).map((entry) => {
      const locked = entry.level > unlockedAdrenaline;
      const checked = entry.level > 0 && entry.level <= checkedAdrenaline;
      const isNext = entry.level === checkedAdrenaline + 1;
      let title = entry.level === 0 ? "Réinitialiser l’Adrénaline (MJ)" : "Cercle déjà coché";
      if (locked) title = `Se débloque au statut ${adrenalineUnlockStates[entry.level]}`;
      else if (isNext) title = "Cliquer pour cocher ce cercle d’Adrénaline";
      if (adrenalinePending && isNext) title = "Effectue d’abord le jet de Corps déjà préparé";

      return {
        ...entry,
        locked,
        disabled: !game.user.isGM && (adrenalinePending || entry.level === 0 || locked || !isNext),
        title
      };
    });

    return {
      ...context,
      actor: this.actor,
      system,
      editable: this.isEditable,
      scenarioLabel,
      isHouse,
      isAntagonist,
      canViewSecret: game.user.isGM || this.actor.isOwner,
      hasSecret: Boolean(system.secret),
      isSpecialAbility: system.secretKind === "ability",
      isGM: game.user.isGM,
      mainTabActive: this._activeTab === "main",
      detailsTabActive: this._activeTab === "details",
      personalityChoices: choices(PERSONALITIES, system.personality),
      personalityLabel: personality.join(" → "),
      personalityRevealed: game.user.isGM || system.personalityRandomUsed,
      personalityRandomLocked: Boolean(system.personalityRandomLocked),
      advantageRandomLocked: Boolean(system.advantageRandomLocked),
      disadvantageRandomLocked: Boolean(system.disadvantageRandomLocked),
      personalityChoiceUnavailable: Boolean(system.personalityRandomLocked || system.personalityRandomUsed),
      advantageChoiceUnavailable: Boolean(system.advantageRandomLocked || system.advantageRandomUsed),
      disadvantageChoiceUnavailable: Boolean(system.disadvantageRandomLocked || system.disadvantageRandomUsed),
      canChoosePersonality: !game.user.isGM && !system.personalityRandomUsed && !system.personalityRandomLocked,
      canChooseAdvantage: !game.user.isGM && !system.advantageRandomUsed && !system.advantageRandomLocked,
      canChooseDisadvantage: !game.user.isGM && !system.disadvantageRandomUsed && !system.disadvantageRandomLocked,
      nameRandomLocked: Boolean(system.nameRandomLocked),
      professionRandomLocked: Boolean(system.professionRandomLocked),
      canRandomizeName: game.user.isGM || !system.nameRandomLocked,
      canRandomizeProfession: game.user.isGM || !system.professionRandomLocked,
      canRandomizePersonality: game.user.isGM || (!system.personalityRandomUsed && !system.personalityRandomLocked),
      canRandomizeAdvantage: game.user.isGM || (!system.advantageRandomUsed && !system.advantageRandomLocked),
      canRandomizeDisadvantage: game.user.isGM || (!system.disadvantageRandomUsed && !system.disadvantageRandomLocked),
      advantageRandomStatus: game.user.isGM
        ? "Aléatoire"
        : system.advantageRandomLocked
          ? "Verrouillé"
          : system.advantageRandomUsed
            ? "Hasard utilisé"
            : "Aléatoire",
      disadvantageRandomStatus: game.user.isGM
        ? "Aléatoire"
        : system.disadvantageRandomLocked
          ? "Verrouillé"
          : system.disadvantageRandomUsed
            ? "Hasard utilisé"
            : "Aléatoire",
      advantageRandomTitle: game.user.isGM
        ? "Tirer un nouvel Avantage au hasard"
        : system.advantageRandomLocked
          ? "Tirage d’Avantage verrouillé par le MJ"
          : system.advantageRandomUsed
            ? "Tirage aléatoire d’Avantage déjà utilisé"
            : "Tirer un Avantage au hasard",
      disadvantageRandomTitle: game.user.isGM
        ? "Tirer un nouveau Désavantage au hasard"
        : system.disadvantageRandomLocked
          ? "Tirage de Désavantage verrouillé par le MJ"
          : system.disadvantageRandomUsed
            ? "Tirage aléatoire de Désavantage déjà utilisé"
            : "Tirer un Désavantage au hasard",
      playerPersonalityChoices: PERSONALITIES.map((labels, index) => ({ value: String(index), label: labels.join(" → ") })),
      playerAdvantageChoices: ADVANTAGES.map((label) => ({ value: label, label })),
      playerDisadvantageChoices: DISADVANTAGES.map((label) => ({ value: label, label })),
      personalityPhases: personality.map((label, index) => ({
        number: index + 1,
        label,
        description: PERSONALITY_HELP[label] ?? "Aucun guide disponible.",
        current: index === phaseIndex
      })),
      advantageChoices: choices(ADVANTAGES, system.advantage, "Aucun Avantage"),
      disadvantageChoices: choices(DISADVANTAGES, system.disadvantage, "Aucun Désavantage"),
      advantageHelp: TRAIT_HELP[system.advantage] ?? "",
      disadvantageHelp: TRAIT_HELP[system.disadvantage] ?? "",
      specialCardChoices: choices(SPECIAL_CARDS, system.specialCard, "À distribuer"),
      bodyGauge: gauge(body, system.resources.body.max),
      spiritGauge: gauge(spirit, system.resources.spirit.max),
      adrenalineGauge,
      adrenalineUnlocked: unlockedAdrenaline,
      bodyState: isAntagonist ? "Antagoniste" : bodyState(body),
      spiritState: spiritState(spirit)
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-personality-help]").on("click", this._onPersonalityHelp.bind(this));
    html.find("[data-sheet-tab]").on("click", this._onChangeSheetTab.bind(this));

    if (!this.isEditable) return;

    html.find("[data-resource][data-value]").on("click", this._onSetResource.bind(this));
    html.find("[data-antagonist-toggle]").on("change", this._onToggleAntagonist.bind(this));
    html.find("[data-antagonist-body-max]").on("change", this._onSetAntagonistBodyMax.bind(this));
    html.find("[data-roll]").on("click", this._onRoll.bind(this));
    html.find("[data-random-personality]").on("click", this._onRandomPersonality.bind(this));
    html.find("[data-random-trait]").on("click", this._onRandomTrait.bind(this));
    html.find("[data-random-name]").on("click", this._onRandomName.bind(this));
    html.find("[data-random-profession]").on("click", this._onRandomProfession.bind(this));
    html.find("[data-lock-random]").on("click", this._onToggleRandomLock.bind(this));
    html.find("[data-player-choice]").on("change", this._onPlayerChoice.bind(this));
    html.find("[data-reveal-secret]").on("click", this._onRevealSecret.bind(this));
    html.find("[data-use-special]").on("click", this._onToggleSpecial.bind(this));
  }

  _onChangeSheetTab(event) {
    event.preventDefault();
    const tabName = event.currentTarget.dataset.sheetTab;
    if (!["main", "details"].includes(tabName)) return;

    this._activeTab = tabName;
    const form = event.currentTarget.closest("form");
    form.querySelectorAll("[data-sheet-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.sheetTab === tabName);
    });
    form.querySelectorAll("[data-sheet-tab-content]").forEach((content) => {
      content.hidden = content.dataset.sheetTabContent !== tabName;
    });
  }

  async _onSetResource(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const resource = button.dataset.resource;
    const value = Number(button.dataset.value);
    const update = { [`system.resources.${resource}.value`]: value };

    if (resource === "adrenaline") {
      const current = Number(this.actor.system.resources.adrenaline.value);
      const unlocked = adrenalineUnlocked(Number(this.actor.system.resources.body.value));
      if (!game.user.isGM && this.actor.system.adrenalinePending) {
        ui.notifications.warn("Effectue d’abord le jet de Corps déjà préparé.");
        return;
      }
      if (!game.user.isGM && (value !== current + 1 || value > unlocked)) {
        ui.notifications.warn("Ce cercle d’Adrénaline n’est pas encore disponible.");
        return;
      }
      update["system.adrenalinePending"] = value > current;
    }

    await this.actor.update(update);
  }

  async _onToggleAntagonist(event) {
    event.preventDefault();
    if (!game.user.isGM) return;

    const enabled = event.currentTarget.checked;
    const update = {
      "system.isAntagonist": enabled,
      "system.adrenalinePending": false
    };
    if (!enabled) {
      update["system.resources.body.max"] = 12;
      update["system.resources.body.value"] = Math.min(12, Number(this.actor.system.resources.body.value));
    }
    await this.actor.update(update);
  }

  async _onSetAntagonistBodyMax(event) {
    event.preventDefault();
    if (!game.user.isGM || !this.actor.system.isAntagonist) return;

    const maximum = Math.max(12, Math.min(30, Number(event.currentTarget.value) || 12));
    await this.actor.update({
      "system.resources.body.max": maximum,
      "system.resources.body.value": maximum
    });
  }

  async _onRandomPersonality(event) {
    event.preventDefault();
    if (!game.user.isGM && this.actor.system.personalityRandomLocked) {
      ui.notifications.warn("Le tirage aléatoire de Personnalité a été verrouillé par le MJ.");
      return;
    }
    if (!game.user.isGM && this.actor.system.personalityRandomUsed) {
      ui.notifications.warn("Le tirage aléatoire de Personnalité a déjà été utilisé.");
      return;
    }

    const update = {
      "system.personality": Math.floor(Math.random() * PERSONALITIES.length)
    };
    if (!game.user.isGM) update["system.personalityRandomUsed"] = true;
    await this.actor.update(update);
  }

  async _onRandomTrait(event) {
    event.preventDefault();
    const kind = event.currentTarget.dataset.randomTrait;
    const traitData = {
      advantage: { values: ADVANTAGES, label: "Avantage" },
      disadvantage: { values: DISADVANTAGES, label: "Désavantage" }
    };
    const config = traitData[kind];
    if (!config) return;

    const usedField = `${kind}RandomUsed`;
    const lockedField = `${kind}RandomLocked`;
    if (!game.user.isGM && this.actor.system[lockedField]) {
      ui.notifications.warn(`Le tirage aléatoire d’${config.label} a été verrouillé par le MJ.`);
      return;
    }
    if (!game.user.isGM && this.actor.system[usedField]) {
      ui.notifications.warn(`Le tirage aléatoire d’${config.label} a déjà été utilisé.`);
      return;
    }
    const update = {
      [`system.${kind}`]: config.values[Math.floor(Math.random() * config.values.length)]
    };
    if (!game.user.isGM) update[`system.${usedField}`] = true;
    await this.actor.update(update);
  }

  async _onToggleRandomLock(event) {
    event.preventDefault();
    if (!game.user.isGM) return;

    const kind = event.currentTarget.dataset.lockRandom;
    const lockData = {
      name: ["nameRandomLocked", null, "du nom"],
      profession: ["professionRandomLocked", null, "de la profession"],
      personality: ["personalityRandomLocked", "personalityRandomUsed", "de la Personnalité"],
      advantage: ["advantageRandomLocked", "advantageRandomUsed", "de l’Avantage"],
      disadvantage: ["disadvantageRandomLocked", "disadvantageRandomUsed", "du Désavantage"]
    };
    if (!lockData[kind]) return;

    const [field, usedField, label] = lockData[kind];
    const currentlyLocked = Boolean(this.actor.system[field]);
    const alreadyUsed = usedField ? Boolean(this.actor.system[usedField]) : false;
    const update = {};

    if (currentlyLocked || alreadyUsed) {
      update[`system.${field}`] = false;
      if (usedField) update[`system.${usedField}`] = false;
      await this.actor.update(update);
      ui.notifications.info(`Choix ${label} ouvert : le joueur peut le modifier une fois.`);
      return;
    }

    await this.actor.update({ [`system.${field}`]: true });
    ui.notifications.info(`Choix ${label} verrouillé pour le joueur.`);
  }

  async _onPlayerChoice(event) {
    event.preventDefault();
    if (game.user.isGM) return;

    const kind = event.currentTarget.dataset.playerChoice;
    const choiceData = {
      personality: { used: "personalityRandomUsed", locked: "personalityRandomLocked", values: PERSONALITIES, label: "Personnalité" },
      advantage: { used: "advantageRandomUsed", locked: "advantageRandomLocked", values: ADVANTAGES, label: "Avantage" },
      disadvantage: { used: "disadvantageRandomUsed", locked: "disadvantageRandomLocked", values: DISADVANTAGES, label: "Désavantage" }
    };
    const config = choiceData[kind];
    if (!config) return;
    if (this.actor.system[config.locked]) {
      ui.notifications.warn(`Le choix de ${config.label} est verrouillé par le MJ.`);
      return;
    }
    if (this.actor.system[config.used]) {
      ui.notifications.warn(`Le choix de ${config.label} a déjà été utilisé.`);
      return;
    }

    const rawValue = event.currentTarget.value;
    const value = kind === "personality" ? Number(rawValue) : rawValue;
    const valid = kind === "personality"
      ? Number.isInteger(value) && value >= 0 && value < config.values.length
      : config.values.includes(value);
    if (!valid) return;

    await this.actor.update({
      [`system.${kind}`]: value,
      [`system.${config.used}`]: true
    });
    ui.notifications.info(`${config.label} choisi. Le choix est maintenant verrouillé.`);
  }

  async _onRandomName(event) {
    event.preventDefault();
    if (!game.user.isGM && this.actor.system.nameRandomLocked) {
      ui.notifications.warn("Le tirage aléatoire du nom a été verrouillé par le MJ.");
      return;
    }
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    await this.actor.update({ name: `${firstName} ${lastName}` });
  }

  async _onRandomProfession(event) {
    event.preventDefault();
    if (!game.user.isGM && this.actor.system.professionRandomLocked) {
      ui.notifications.warn("Le tirage aléatoire de la profession a été verrouillé par le MJ.");
      return;
    }
    const profession = PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)];
    await this.actor.update({ "system.profession": profession });
  }

  _onPersonalityHelp(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const card = button.closest(".personality-card");
    const selectedPhase = button.dataset.personalityHelp;

    card.querySelectorAll("[data-personality-help]").forEach((phaseButton) => {
      const selected = phaseButton === button;
      phaseButton.classList.toggle("viewing", selected);
      phaseButton.setAttribute("aria-expanded", String(selected));
    });

    card.querySelectorAll("[data-personality-guide]").forEach((guide) => {
      guide.hidden = guide.dataset.personalityGuide !== selectedPhase;
    });
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
    const usesAdrenaline = ability === "body" && !this.actor.system.isAntagonist && Boolean(this.actor.system.adrenalinePending);
    const target = usesAdrenaline ? 12 : this.actor.system.resources[ability].value;
    const label = ability === "body" ? "Corps" : "Esprit";

    if (usesAdrenaline) {
      await this.actor.update({ "system.adrenalinePending": false });
    }

    const d20Roll = await new Roll("1d20").evaluate();
    const d20 = d20Roll.total;
    const success = d20 !== 20 && d20 <= target;
    const resultLabel = d20 === 20 ? "échec critique" : success ? "réussite" : "échec";
    const adrenalineDetail = usesAdrenaline ? " · Adrénaline" : "";

    if (kind === "attack") {
      const damageRoll = await new Roll("1d6").evaluate();
      const d6 = damageRoll.total;
      let outcome;

      if (!success) {
        outcome = `<strong>${resultLabel}</strong>${adrenalineDetail} · d6 ${d6} ignoré · aucun dommage`;
      } else if (d6 <= 4) {
        outcome = `<strong>réussite</strong>${adrenalineDetail} · d6 ${d6}<strong class="sombre-damage">3 Blessures</strong><small>dommages fixes</small>`;
      } else {
        outcome = `<strong>réussite</strong>${adrenalineDetail} · d6 ${d6}<strong class="sombre-damage">${d20} Blessure${d20 > 1 ? "s" : ""}</strong><small>dommages variables</small>`;
      }

      const flavor = [
        `<strong>${this.actor.name}</strong> — attaque`,
        `<span class="sombre-roll ${success ? "success" : "failure"}">`,
        `${d20} sous ${target} : ${outcome}`,
        "</span>"
      ].join(" ");

      await ChatMessage.create({
        speaker,
        flavor,
        rolls: [d20Roll, damageRoll],
        sound: CONFIG.sounds.dice
      });
      return;
    }

    const flavor = [
      `<strong>${this.actor.name}</strong> — jet d’${label}`,
      `<span class="sombre-roll ${success ? "success" : "failure"}">`,
      `${d20} sous ${target} : <strong>${resultLabel}</strong>${adrenalineDetail}`,
      "</span>"
    ].join(" ");

    await d20Roll.toMessage({ speaker, flavor });
  }
}
