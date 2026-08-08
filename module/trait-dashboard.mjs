import { TRAIT_HELP } from "./constants.mjs";

const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER = "__root__";

const actorFolderId = (actor) => actor.folder?.id ?? actor.folder ?? null;
const parentFolderId = (folder) => folder.folder?.id ?? folder.folder ?? null;

class SombreTraitDashboard extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sombre-trait-dashboard",
      classes: ["sombre-classic", "trait-dashboard"],
      title: "Récapitulatif des Traits",
      template: "systems/sombre-classic-house/templates/trait-dashboard.hbs",
      width: 720,
      height: 650,
      resizable: true
    });
  }

  getData(options = {}) {
    const context = super.getData(options);
    const folders = game.folders
      .filter((folder) => folder.type === "Actor")
      .sort((left, right) => {
        const path = (folder) => [...(folder.ancestors ?? []), folder].map((entry) => entry.name).join(" / ");
        return path(left).localeCompare(path(right), "fr");
      });
    const selectedSetting = game.settings.get(SYSTEM_ID, "traitDashboardFolder");
    const selectedFolder = selectedSetting === ROOT_FOLDER || folders.some((folder) => folder.id === selectedSetting)
      ? selectedSetting
      : "";
    const includeSubfolders = game.settings.get(SYSTEM_ID, "traitDashboardSubfolders");
    const allowedFolders = this._allowedFolderIds(folders, selectedFolder, includeSubfolders);

    const actors = game.actors
      .filter((actor) => actor.type === "victime")
      .filter((actor) => {
        const folderId = actorFolderId(actor);
        if (!selectedFolder) return true;
        if (selectedFolder === ROOT_FOLDER) return !folderId;
        return allowedFolders.has(folderId);
      })
      .sort((left, right) => {
        const folderComparison = (left.folder?.name ?? "").localeCompare(right.folder?.name ?? "", "fr");
        return folderComparison || left.name.localeCompare(right.name, "fr");
      })
      .map((actor) => ({
        id: actor.id,
        name: actor.name,
        img: actor.img,
        playerName: actor.system.playerName,
        folderName: actor.folder?.name ?? "Sans dossier",
        advantage: actor.system.advantage,
        disadvantage: actor.system.disadvantage
      }));

    const folderChoices = [
      { id: "", label: "Tous les dossiers", selected: selectedFolder === "" },
      { id: ROOT_FOLDER, label: "Sans dossier", selected: selectedFolder === ROOT_FOLDER },
      ...folders.map((folder) => ({
        id: folder.id,
        label: `${"— ".repeat(folder.ancestors?.length ?? folder.depth ?? 0)}${folder.name}`,
        selected: selectedFolder === folder.id
      }))
    ];

    return {
      ...context,
      actors,
      actorCount: actors.length,
      folderChoices,
      includeSubfolders
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-trait-folder]").on("change", this._onChangeFolder.bind(this));
    html.find("[data-trait-subfolders]").on("change", this._onChangeSubfolders.bind(this));
    html.find("[data-open-trait-actor]").on("click", this._onOpenActor.bind(this));
    html.find("[data-show-trait]").on("click", this._onShowTrait.bind(this));
    html.find("[data-refresh-traits]").on("click", () => this.render(false));
  }

  _allowedFolderIds(folders, selectedFolder, includeSubfolders) {
    const allowed = new Set();
    if (!selectedFolder || selectedFolder === ROOT_FOLDER) return allowed;
    allowed.add(selectedFolder);
    if (!includeSubfolders) return allowed;

    let added = true;
    while (added) {
      added = false;
      for (const folder of folders) {
        if (!allowed.has(folder.id) && allowed.has(parentFolderId(folder))) {
          allowed.add(folder.id);
          added = true;
        }
      }
    }
    return allowed;
  }

  async _onChangeFolder(event) {
    await game.settings.set(SYSTEM_ID, "traitDashboardFolder", event.currentTarget.value);
    this.render(false);
  }

  async _onChangeSubfolders(event) {
    await game.settings.set(SYSTEM_ID, "traitDashboardSubfolders", event.currentTarget.checked);
    this.render(false);
  }

  _onOpenActor(event) {
    event.preventDefault();
    game.actors.get(event.currentTarget.dataset.openTraitActor)?.sheet.render(true);
  }

  _onShowTrait(event) {
    event.preventDefault();
    const actor = game.actors.get(event.currentTarget.dataset.actorId);
    const kind = event.currentTarget.dataset.showTrait;
    if (!actor || !["advantage", "disadvantage"].includes(kind)) return;

    const trait = actor.system[kind];
    if (!trait) return;
    const description = TRAIT_HELP[trait] || actor.system[`${kind}Description`] || "Aucune description disponible.";
    const typeLabel = kind === "advantage" ? "Avantage" : "Désavantage";
    const escape = foundry.utils.escapeHTML;

    new Dialog({
      title: `${typeLabel} — ${trait}`,
      content: [
        '<div class="trait-reminder-dialog">',
        `<small>${escape(actor.name)} · ${typeLabel}</small>`,
        `<h2>${escape(trait)}</h2>`,
        `<p>${escape(description)}</p>`,
        "</div>"
      ].join(""),
      buttons: {
        public: {
          icon: '<i class="fa-solid fa-comment"></i>',
          label: "Chat public",
          callback: () => this._sendTrait(actor, typeLabel, trait, description, false)
        },
        private: {
          icon: '<i class="fa-solid fa-user-lock"></i>',
          label: "Au joueur",
          callback: () => this._sendTrait(actor, typeLabel, trait, description, true)
        },
        close: {
          icon: '<i class="fa-solid fa-xmark"></i>',
          label: "Fermer"
        }
      },
      default: "close"
    }).render(true);
  }

  async _sendTrait(actor, typeLabel, trait, description, whisper) {
    const escape = foundry.utils.escapeHTML;
    const message = {
      speaker: ChatMessage.getSpeaker({ actor }),
      content: [
        '<div class="sombre-trait-chat">',
        `<small>${escape(actor.name)} · ${escape(typeLabel)}</small>`,
        `<h3>${escape(trait)}</h3>`,
        `<p>${escape(description)}</p>`,
        "</div>"
      ].join("")
    };

    if (whisper) {
      const recipients = game.users
        .filter((user) => !user.isGM && actor.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER))
        .map((user) => user.id);
      if (!recipients.length) {
        ui.notifications.warn(`Aucun joueur ne possède ${actor.name}.`);
        return;
      }
      message.whisper = recipients;
    }
    await ChatMessage.create(message);
  }
}

const dashboard = new SombreTraitDashboard();

const refreshDashboard = () => {
  if (dashboard.rendered) dashboard.render(false);
};

const openAllCharacterChoices = async () => {
  const actors = game.actors.filter((actor) => actor.type === "victime" && !actor.system.isAntagonist);
  if (!actors.length) {
    ui.notifications.warn("Aucune fiche de joueur à ouvrir.");
    return;
  }

  await Promise.all(actors.map((actor) => actor.update({
    "system.personalityRandomLocked": false,
    "system.personalityRandomUsed": false,
    "system.advantageRandomLocked": false,
    "system.advantageRandomUsed": false,
    "system.disadvantageRandomLocked": false,
    "system.disadvantageRandomUsed": false
  })));
  ui.notifications.info(`Choix ouverts une fois pour ${actors.length} fiche${actors.length > 1 ? "s" : ""}.`);
};

const confirmOpenAllCharacterChoices = () => {
  new Dialog({
    title: "Ouvrir les choix des joueurs",
    content: "<p>Chaque joueur pourra choisir ou tirer <strong>une fois</strong> sa Personnalité, son Avantage et son Désavantage. Les choix actuels pourront être remplacés.</p>",
    buttons: {
      open: {
        icon: '<i class="fa-solid fa-lock-open"></i>',
        label: "Ouvrir pour toutes les fiches",
        callback: openAllCharacterChoices
      },
      cancel: {
        icon: '<i class="fa-solid fa-xmark"></i>',
        label: "Annuler"
      }
    },
    default: "cancel"
  }).render(true);
};

export const registerTraitDashboard = () => {
  game.settings.register(SYSTEM_ID, "traitDashboardFolder", {
    scope: "client",
    config: false,
    type: String,
    default: ""
  });
  game.settings.register(SYSTEM_ID, "traitDashboardSubfolders", {
    scope: "client",
    config: false,
    type: Boolean,
    default: true
  });

  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    if (!html.find("[data-open-trait-dashboard]").length) {
      const dashboardButton = $('<button type="button" data-open-trait-dashboard><i class="fa-solid fa-list-check"></i> Récap Traits</button>');
      dashboardButton.on("click", () => dashboard.render(true));
      target.append(dashboardButton);
    }
    if (!html.find("[data-open-character-choices]").length) {
      const choicesButton = $('<button type="button" data-open-character-choices title="Autoriser un choix unique sur toutes les fiches"><i class="fa-solid fa-lock-open"></i> Choix joueurs</button>');
      choicesButton.on("click", confirmOpenAllCharacterChoices);
      target.append(choicesButton);
    }
  });

  for (const hook of ["createActor", "updateActor", "deleteActor", "createFolder", "updateFolder", "deleteFolder"]) {
    Hooks.on(hook, refreshDashboard);
  }
};
