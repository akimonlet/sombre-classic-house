const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER_NAME = "Scénarios personnalisés";
const SCENARIO_FOLDER_NAME = "HÉLIX 2008";

const CHARACTERS = [
  {
    id: "nicolas",
    name: "Nicolas Favre",
    profession: "Agent de sécurité privée",
    background: "Nicolas arrive en voiture de service à la grille d'entrée face aux 80 manifestants du collectif Léman-Sécurité et au car scolaire coincé.",
    equipment: "Trousseau passe-partout, Talkie VHF canal 1, Taser (2 coups), Matraque",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj1_nicolas_favre.jpg",
    body: 12,
    spirit: 8
  },
  {
    id: "ines",
    name: "Inès Renaud",
    profession: "Journaliste scientifique",
    background: "Inès prépare son duplex télévisé pour l'ouverture d'antenne de 09h55 dans l'atrium des visiteurs, avant d'être abordée par le Pr Hoffman.",
    equipment: "Enregistreur numérique Olympus, Torche vidéo LED 12V très puissante, Passe Presse",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj2_ines_renaud.jpg",
    body: 8,
    spirit: 12
  },
  {
    id: "samira",
    name: "Dr Samira Bensaïd",
    profession: "Médecin du travail",
    background: "Le Dr Bensaïd gère les urgences du matin à l'infirmerie du bâtiment B : Marc avec sa brûlure cryo et Élodie en crise d'angoisse.",
    equipment: "Sacoche médicale d'urgence (Morphine x3, Garrots x2, Scalpel, Pansements compressifs, Lampe stylo)",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj3_samira_bensaid.jpg",
    body: 8,
    spirit: 12
  },
  {
    id: "lukas",
    name: "Lukas Meier",
    profession: "Ingénieur cryogénie",
    background: "Lukas contrôle les vannes et compresseurs d'hélium à 1,9 K à la sous-station B-4 (-20m) sous la pression de son chef Bossis.",
    equipment: "Grande clé à griffe en acier trempé, Lampe frontale industrielle, Gants cryo isolants, Dosimètre actif",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj4_lukas_meier.jpg",
    body: 10,
    spirit: 10
  },
  {
    id: "anna",
    name: "Dr Anna Kowalska",
    profession: "Physicienne principale",
    background: "Anna supervise les derniers paramètres du faisceau à 7 TeV dans la salle de contrôle centrale (-80m) face à l'intransigeance du directeur Zimmerman.",
    equipment: "Badge Maître Sécurité Niveau 4, Inhalateur Ventoline, Ordinateur portable durci avec données du tir",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj5_anna_kowalska.jpg",
    body: 6,
    spirit: 12
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
  img: character.img,
  folder: folderId,
  flags: { [SYSTEM_ID]: { helix2008Id: character.id } },
  prototypeToken: {
    name: character.name,
    texture: { src: character.img },
    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
  },
  system: {
    scenarioId: "helix-2008",
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
      body: { value: character.body, max: 12 },
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
  const existingIds = new Set(game.actors.map((actor) => actor.getFlag(SYSTEM_ID, "helix2008Id")).filter(Boolean));
  const missing = CHARACTERS.filter((character) => !existingIds.has(character.id));

  if (!missing.length) {
    ui.notifications.info("Les cinq fiches d'HÉLIX 2008 existent déjà.");
    return;
  }

  await Actor.createDocuments(missing.map((character) => actorData(character, scenarioFolder.id)));
  ui.notifications.info(`Fiches créées : ${missing.map((character) => character.name).join(", ")}.`);
};

const confirmCreation = () => {
  new Dialog({
    title: "Créer les fiches — HÉLIX 2008",
    content: [
      "<p>Créer le dossier <strong>Scénarios personnalisés / HÉLIX 2008</strong> et les 5 fiches de Nicolas, Inès, Samira, Lukas et Anna ?</p>",
      "<p>Les fiches déjà présentes ne seront ni remplacées ni dupliquées.</p>"
    ].join(""),
    buttons: {
      create: {
        icon: '<i class="fa-solid fa-user-plus"></i>',
        label: "Créer les cinq fiches",
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

export const registerHelix2008Generator = () => {
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-helix-2008]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-helix-2008 title="Créer les cinq fiches d’HÉLIX 2008"><i class="fa-solid fa-atom"></i> HÉLIX 2008</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
