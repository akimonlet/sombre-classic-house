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
    const spirit = system.resources.spirit.value;
    const body = system.resources.body.value;
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
      isGM: game.user.isGM,
      mainTabActive: this._activeTab === "main",
      detailsTabActive: this._activeTab === "details",
      personalityChoices: choices(PERSONALITIES, system.personality),
      personalityLabel: personality.join(" → "),
      personalityRevealed: game.user.isGM || system.personalityRandomUsed,
      personalityRandomLocked: Boolean(system.personalityRandomLocked),
      traitsRandomLocked: Boolean(system.traitsRandomLocked),
      nameRandomLocked: Boolean(system.nameRandomLocked),
      professionRandomLocked: Boolean(system.professionRandomLocked),
      canRandomizeName: game.user.isGM || !system.nameRandomLocked,
      canRandomizeProfession: game.user.isGM || !system.professionRandomLocked,
      canRandomizePersonality: game.user.isGM || (!system.personalityRandomUsed && !system.personalityRandomLocked),
      canRandomizeTraits: game.user.isGM || (!system.traitsRandomUsed && !system.traitsRandomLocked),
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
      bodyState: bodyState(body),
      spiritState: spiritState(spirit)
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-personality-help]").on("click", this._onPersonalityHelp.bind(this));
    html.find("[data-sheet-tab]").on("click", this._onChangeSheetTab.bind(this));

    if (!this.isEditable) return;

    html.find("[data-resource][data-value]").on("click", this._onSetResource.bind(this));
    html.find("[data-roll]").on("click", this._onRoll.bind(this));
    html.find("[data-random-personality]").on("click", this._onRandomPersonality.bind(this));
    html.find("[data-random-traits]").on("click", this._onRandomTraits.bind(this));
    html.find("[data-random-name]").on("click", this._onRandomName.bind(this));
    html.find("[data-random-profession]").on("click", this._onRandomProfession.bind(this));
    html.find("[data-lock-random]").on("click", this._onToggleRandomLock.bind(this));
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

  async _onRandomTraits(event) {
    event.preventDefault();
    if (!game.user.isGM && this.actor.system.traitsRandomLocked) {
      ui.notifications.warn("Le tirage aléatoire des Traits a été verrouillé par le MJ.");
      return;
    }
    if (!game.user.isGM && this.actor.system.traitsRandomUsed) {
      ui.notifications.warn("Le tirage aléatoire des Traits a déjà été utilisé.");
      return;
    }

    const advantage = ADVANTAGES[Math.floor(Math.random() * ADVANTAGES.length)];
    const disadvantage = DISADVANTAGES[Math.floor(Math.random() * DISADVANTAGES.length)];
    const update = {
      "system.advantage": advantage,
      "system.disadvantage": disadvantage
    };
    if (!game.user.isGM) update["system.traitsRandomUsed"] = true;
    await this.actor.update(update);
  }

  async _onToggleRandomLock(event) {
    event.preventDefault();
    if (!game.user.isGM) return;

    const kind = event.currentTarget.dataset.lockRandom;
    const lockData = {
      name: ["nameRandomLocked", "Nom"],
      profession: ["professionRandomLocked", "Profession"],
      personality: ["personalityRandomLocked", "Personnalité"],
      traits: ["traitsRandomLocked", "Traits"]
    };
    if (!lockData[kind]) return;

    const [field, label] = lockData[kind];
    const locked = !Boolean(this.actor.system[field]);
    await this.actor.update({ [`system.${field}`]: locked });
    ui.notifications.info(`Tirage de ${label} ${locked ? "verrouillé pour les joueurs" : "déverrouillé"}.`);
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
    const usesAdrenaline = ability === "body" && Boolean(this.actor.system.adrenalinePending);
    const target = usesAdrenaline ? 12 : this.actor.system.resources[ability].value;
    const label = ability === "body" ? "Corps" : "Esprit";

    if (usesAdrenaline) {
      await this.actor.update({ "system.adrenalinePending": false });
    }

    const d20Roll = await new Roll("1d20").evaluate();
    const d20 = d20Roll.total;
    const success = d20 <= target;
    const adrenalineDetail = usesAdrenaline ? " · Adrénaline" : "";

    if (kind === "attack") {
      const damageRoll = await new Roll("1d6").evaluate();
      const d6 = damageRoll.total;
      let outcome;

      if (!success) {
        outcome = `<strong>échec</strong>${adrenalineDetail} · d6 ${d6} ignoré · aucun dommage`;
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
      `${d20} sous ${target} : <strong>${success ? "réussite" : "échec"}</strong>${adrenalineDetail}`,
      "</span>"
    ].join(" ");

    await d20Roll.toMessage({ speaker, flavor });
  }
}
