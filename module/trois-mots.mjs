const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER_NAME = "Scénarios personnalisés";
const SCENARIO_FOLDER_NAME = "Trois mots avant le feu";

const CHARACTERS = [
  {
    id: "oru",
    name: "Oru",
    profession: "Penseur du clan du Caillou",
    background: "Oru observe les faits et démêle les récits contradictoires mieux que quiconque dans son clan.",
    equipment: "",
    spirit: 12
  },
  {
    id: "tala",
    name: "Tala",
    profession: "Gardienne de la fête du clan du Caillou",
    background: "Tala organise les rassemblements, répartit les réserves et veille au respect des invités.",
    equipment: "Torche",
    spirit: 10
  },
  {
    id: "brak",
    name: "Brak",
    profession: "Escorte du clan du Feu",
    background: "Brak protège les voyageurs et les convois de nourriture de son clan.",
    equipment: "Massue",
    spirit: 10
  }
];

const folderParentId = (folder) => folder?.folder?.id ?? folder?.folder ?? null;

const findActorFolder = (name, parentId = null) => game.folders.find((folder) => (
  folder.type === "Actor"
  && folder.name === name
  && folderParentId(folder) === parentId
));

const ensureActorFolder = async (name, parentId = null) => (
  findActorFolder(name, parentId)
  ?? Folder.create({ name, type: "Actor", folder: parentId })
);

const actorData = (character, folderId) => ({
  name: character.name,
  type: "victime",
  folder: folderId,
  flags: { [SYSTEM_ID]: { troisMotsId: character.id } },
  prototypeToken: {
    name: character.name,
    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
  },
  system: {
    scenarioId: "trois-mots",
    isAntagonist: false,
    playerName: "",
    profession: character.profession,
    nameRandomLocked: true,
    professionRandomLocked: true,
    positiveLink: "",
    specialCard: "",
    personality: 0,
    personalityRandomUsed: false,
    personalityRandomLocked: false,
    advantage: "",
    advantageDescription: "",
    disadvantage: "",
    disadvantageDescription: "",
    advantageRandomUsed: false,
    advantageRandomLocked: false,
    disadvantageRandomUsed: false,
    disadvantageRandomLocked: false,
    traitsRandomUsed: false,
    traitsRandomLocked: false,
    adrenalinePending: false,
    resources: {
      body: { value: 12, max: 12 },
      spirit: { value: character.spirit, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    background: character.background,
    equipment: character.equipment,
    secret: "",
    secretKind: "",
    specialUsed: false,
    infected: false,
    gmNotes: ""
  }
});

const createCharacters = async () => {
  const rootFolder = await ensureActorFolder(ROOT_FOLDER_NAME);
  const scenarioFolder = await ensureActorFolder(SCENARIO_FOLDER_NAME, rootFolder.id);
  const existingIds = new Set(game.actors.map((actor) => actor.getFlag(SYSTEM_ID, "troisMotsId")).filter(Boolean));
  const missing = CHARACTERS.filter((character) => !existingIds.has(character.id));

  if (!missing.length) {
    ui.notifications.info("Les trois fiches de Trois mots avant le feu existent déjà.");
    return;
  }

  await Actor.createDocuments(missing.map((character) => actorData(character, scenarioFolder.id)));
  ui.notifications.info(`Fiches créées : ${missing.map((character) => character.name).join(", ")}.`);
};

const confirmCreation = () => {
  new Dialog({
    title: "Créer les fiches — Trois mots avant le feu",
    content: [
      "<p>Créer le dossier <strong>Scénarios personnalisés / Trois mots avant le feu</strong> et les fiches d’Oru, Tala et Brak ?</p>",
      "<p>Les fiches déjà présentes ne seront ni remplacées ni dupliquées.</p>"
    ].join(""),
    buttons: {
      create: {
        icon: '<i class="fa-solid fa-user-plus"></i>',
        label: "Créer les trois fiches",
        callback: createCharacters
      },
      cancel: {
        icon: '<i class="fa-solid fa-xmark"></i>',
        label: "Annuler"
      }
    },
    default: "cancel"
  }).render(true);
};

export const registerTroisMotsGenerator = () => {
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-trois-mots]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-trois-mots title="Créer les trois fiches optionnelles"><i class="fa-solid fa-users"></i> Trois mots</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
