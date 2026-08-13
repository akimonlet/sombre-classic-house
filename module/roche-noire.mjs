const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER_NAME = "Scénarios personnalisés";
const SCENARIO_FOLDER_NAME = "La Roche-Noire";

const CHARACTERS = [
  {
    id: "ena",
    name: "Ena",
    playerName: "Max",
    profession: "Pisteuse",
    background: "Patiente et observatrice, Ena connaît les pistes, les traces et les chemins autour du territoire mieux que quiconque.",
    equipment: "Arc, trois flèches, couteau de pierre et fragment de parure d’un ravisseur."
  },
  {
    id: "orn",
    name: "Orn",
    playerName: "Grelot",
    profession: "Tailleur de pierre",
    background: "Orn taille le silex et la pierre pour façonner les outils dont le clan se sert chaque jour.",
    equipment: "Pointes de sagaie et lame fine, dans l’état résultant de ton introduction."
  },
  {
    id: "kor",
    name: "Kor",
    playerName: "Crevetolog",
    profession: "Chasseur",
    background: "Kor est un chasseur endurant, habitué aux longues traques et aux dangers loin des abris.",
    equipment: "Lance, couteau de pierre ; viande, peau ou tendons récupérés pendant ton introduction."
  },
  {
    id: "sira",
    name: "Sira",
    playerName: "Pikiou",
    profession: "Travailleuse des peaux et des fibres",
    background: "Sira travaille les peaux et les fibres pour fabriquer vêtements, sacs, liens et objets indispensables au clan.",
    equipment: "Corde, peau de portage et sangles, dans l’état résultant de ton introduction."
  }
];

const folderParentId = (folder) => folder?.folder?.id ?? folder?.folder ?? null;

const PREVIOUS_BACKGROUNDS = {
  ena: "Pisteuse envoyée chercher Nara, tu l’as vue prisonnière de trois membres de la Roche-Noire et dois rapporter leurs signes distinctifs.",
  orn: "Artisan du clan chargé de trouver le meilleur silex et de préparer des armes fiables pour l’expédition.",
  kor: "Chasseur parti relever les pièges avec Ina, tu dois rapporter les ressources nécessaires à l’expédition.",
  sira: "Artisane chargée de rendre fiables les cordes, les sangles et le moyen prévu pour transporter Nara blessée."
};

const findActorFolder = (name, parentId = null) => game.folders.find((folder) => (
  folder.type === "Actor"
  && folder.name === name
  && folderParentId(folder) === parentId
));

const ensureActorFolder = async (name, parentId = null) => (
  findActorFolder(name, parentId)
  ?? Folder.create({ name, type: "Actor", folder: parentId })
);

const ownershipFor = (playerName) => {
  const player = game.users.find((user) => (
    !user.isGM && user.name.localeCompare(playerName, "fr", { sensitivity: "base" }) === 0
  ));
  return player ? { [player.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER } : {};
};

const actorData = (character, folderId) => ({
  name: character.name,
  type: "victime",
  folder: folderId,
  ownership: ownershipFor(character.playerName),
  flags: {
    [SYSTEM_ID]: {
      rocheNoireId: character.id
    }
  },
  prototypeToken: {
    name: `${character.name} - ${character.playerName}`,
    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
  },
  system: {
    scenarioId: "roche-noire",
    isAntagonist: false,
    playerName: character.playerName,
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
      spirit: { value: 10, max: 12 },
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

const createRocheNoireActors = async () => {
  const rootFolder = await ensureActorFolder(ROOT_FOLDER_NAME);
  const scenarioFolder = await ensureActorFolder(SCENARIO_FOLDER_NAME, rootFolder.id);
  const existingIds = new Set(
    game.actors
      .map((actor) => actor.getFlag(SYSTEM_ID, "rocheNoireId"))
      .filter(Boolean)
  );
  const missing = CHARACTERS.filter((character) => !existingIds.has(character.id));

  if (!missing.length) {
    ui.notifications.info("Les quatre fiches de La Roche-Noire existent déjà.");
    return;
  }

  await Actor.createDocuments(missing.map((character) => actorData(character, scenarioFolder.id)));
  const created = missing.map((character) => character.name).join(", ");
  ui.notifications.info(`Fiches créées dans ${ROOT_FOLDER_NAME} / ${SCENARIO_FOLDER_NAME} : ${created}.`);
};

const migrateRevealingBackgrounds = async () => {
  if (!game.user.isGM) return;
  const byId = new Map(CHARACTERS.map((character) => [character.id, character]));
  const updates = game.actors
    .map((actor) => {
      const id = actor.getFlag(SYSTEM_ID, "rocheNoireId");
      const character = byId.get(id);
      if (!character || actor.system.background !== PREVIOUS_BACKGROUNDS[id]) return null;
      return actor.update({ "system.background": character.background });
    })
    .filter(Boolean);
  if (updates.length) await Promise.all(updates);
};

const confirmCreation = () => {
  new Dialog({
    title: "Créer les fiches — La Roche-Noire",
    content: [
      "<p>Créer le dossier <strong>Scénarios personnalisés / La Roche-Noire</strong> et les fiches d’Ena, Orn, Kor et Sira ?</p>",
      "<p>Les fiches déjà présentes ne seront ni remplacées ni dupliquées.</p>"
    ].join(""),
    buttons: {
      create: {
        icon: '<i class="fa-solid fa-user-plus"></i>',
        label: "Créer les quatre fiches",
        callback: createRocheNoireActors
      },
      cancel: {
        icon: '<i class="fa-solid fa-xmark"></i>',
        label: "Annuler"
      }
    },
    default: "cancel"
  }).render(true);
};

export const registerRocheNoireGenerator = () => {
  Hooks.once("ready", migrateRevealingBackgrounds);
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-roche-noire]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-roche-noire title="Créer les quatre fiches optionnelles de La Roche-Noire"><i class="fa-solid fa-users"></i> La Roche-Noire</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
