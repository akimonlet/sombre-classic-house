const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER_NAME = "Scénarios personnalisés";
const SCENARIO_FOLDER_NAME = "HÉLIX 2008";

const PCS = [
  {
    id: "nicolas",
    name: "Nicolas Favre",
    playerName: "Crevetolog",
    subfolder: "1. Personnages Joueurs",
    profession: "Agent de sécurité privée",
    background: "Ancien gendarme reconverti dans la sécurité privée, Nicolas est un professionnel calme et consciencieux qui supporte mal les ordres absurdes.",
    equipment: "Talkie-walkie VHF, Lampe torche Maglite",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj1_nicolas_favre.jpg",
    body: 12,
    spirit: 8,
    isAntagonist: false
  },
  {
    id: "ines",
    name: "Inès Renaud",
    playerName: "Pikiou",
    subfolder: "1. Personnages Joueurs",
    profession: "Journaliste scientifique",
    background: "Journaliste scientifique curieuse et tenace, Inès s'est fait une réputation en posant les questions que les chercheurs et leurs communicants préféreraient éviter.",
    equipment: "Enregistreur numérique, Bloc-notes et stylo",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj2_ines_renaud.jpg",
    body: 8,
    spirit: 12,
    isAntagonist: false
  },
  {
    id: "samira",
    name: "Dr Samira Bensaïd",
    playerName: "Grelot",
    subfolder: "1. Personnages Joueurs",
    profession: "Médecin du travail",
    background: "Médecin du travail expérimentée, Samira garde son sang-froid face aux urgences et refuse que la hiérarchie fasse passer la production avant la santé.",
    equipment: "Petite sacoche médicale (pansements et une dose de morphine)",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj3_samira_bensaid.jpg",
    body: 8,
    spirit: 12,
    isAntagonist: false
  },
  {
    id: "lukas",
    name: "Lukas Meier",
    playerName: "Delva",
    subfolder: "1. Personnages Joueurs",
    profession: "Ingénieur cryogénie",
    background: "Ingénieur de terrain bourru mais fiable, Lukas connaît les machines d'HÉLIX mieux que quiconque et accorde davantage de confiance aux instruments qu'aux cadres.",
    equipment: "Grande clé à griffe, Lampe frontale industrielle",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj4_lukas_meier.jpg",
    body: 10,
    spirit: 10,
    isAntagonist: false
  },
  {
    id: "anna",
    name: "Dr Anna Kowalska",
    playerName: "Max",
    subfolder: "1. Personnages Joueurs",
    profession: "Physicienne principale",
    background: "Physicienne brillante ayant consacré des années à HÉLIX, Anna partage l'ambition scientifique du projet tout en prenant ses risques bien plus au sérieux que sa direction.",
    equipment: "Badge personnel Niveau 4, Inhalateur de secours",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pj5_anna_kowalska.jpg",
    body: 6,
    spirit: 12,
    isAntagonist: false
  }
];

const NPCS = [
  {
    id: "serge",
    name: "Serge Morin",
    subfolder: "2. PNJ Survivants",
    profession: "Gardien en chef du portail",
    background: "Ancien militaire suisse, soupe au lait, dépassé par la foule des manifestants. Prêt à tout pour s'enfuir quand le chaos éclate.",
    equipment: "Matraque, Talkie VHF, Clé de dérogation portail (Code 7741)",
    gmNotes: "Secret : A caché un pistolet 9mm non déclaré dans le faux plafond du poste de garde (R01).",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_serge_morin.jpg",
    body: 12,
    spirit: 6,
    isAntagonist: false
  },
  {
    id: "claire",
    name: "Claire Vaneck",
    subfolder: "2. PNJ Survivants",
    profession: "Porte-parole Collectif Léman-Sécurité",
    background: "Militante écologiste pacifiste. Courageuse et idéaliste, elle tente de protéger les enfants du car scolaire.",
    equipment: "Mégaphone, Trousse de secours, Clés du van, Tracts anti-trou noir",
    gmNotes: "Connaît parfaitement les sentiers forestiers du Jura entourant le site.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_claire_vaneck.jpg",
    body: 8,
    spirit: 10,
    isAntagonist: false
  },
  {
    id: "zimmerman",
    name: "Dr Hans Zimmerman",
    subfolder: "2. PNJ Survivants",
    profession: "Directeur scientifique d'HÉLIX",
    background: "Ambitieux et arrogant. Refuse d'admettre son erreur et se fait froidement abattre par les militaires à leur arrivée.",
    equipment: "Badge Maître Niveau 4, Seconde clé physique du Beam Dump (dans son bureau CCR), Téléphone satellite",
    gmNotes: "La seconde clé physique du Beam Dump est dans son tiroir de bureau fermé à clé (R23).",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_hans_zimmerman.jpg",
    body: 6,
    spirit: 12,
    isAntagonist: false
  },
  {
    id: "marc",
    name: "Marc Lesueur",
    subfolder: "2. PNJ Survivants",
    profession: "Technicien de maintenance",
    background: "Blessé superficiellement au bras par de l'hélium à 09h20. Gaillard robuste et loyal envers le Dr Bensaïd.",
    equipment: "Bleu de travail, Tournevis isolé, Badge d'accès Niveau 2",
    gmNotes: "Sait où sont stockées les 3 combinaisons cryogéniques étanches (R16).",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_marc_lesueur.jpg",
    body: 10,
    spirit: 8,
    isAntagonist: false
  },
  {
    id: "elodie",
    name: "Élodie Brunet",
    subfolder: "2. PNJ Survivants",
    profession: "Secrétaire de direction",
    background: "En état de choc catatonique à l'infirmerie suite à la prise de sédatif lourd.",
    equipment: "Sac à main, Badge visiteur, Boîte d'anxiolytiques",
    gmNotes: "Fardeau vulnérable à protéger lors de l'évacuation.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_elodie_brunet.jpg",
    body: 6,
    spirit: 6,
    isAntagonist: false
  }
];

const MONSTERS = [
  {
    id: "rodeur",
    name: "Le Rôdeur de Faille",
    subfolder: "3. Monstres & Menaces",
    profession: "Traqueur dimensionnel aveugle",
    background: "Quadrupède écorché traquant aux vibrations du sol et au bruit. Crâne fendu par une mâchoire verticale d'obsidienne. Vitesse fulgurante.",
    equipment: "Griffes tranchantes (2 Blessures nettes), Mâchoire broyeuse",
    gmNotes: "Sensible aux flashs lumineux violents (Torche LED d'Inès) et aux bruits métalliques de diversion.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/monstre_rodeur_faille.jpg",
    body: 16,
    spirit: 4,
    isAntagonist: true
  },
  {
    id: "spectre",
    name: "Le Spectre de Résonance",
    subfolder: "3. Monstres & Menaces",
    profession: "Entité cryogénique éthérée",
    background: "Brume violette semi-consciente traversant les parois. Provoque des hallucinations et un froid extrême à -50°C.",
    equipment: "Aura de gel (-50°C, 1 Blessure), Drain de folie (1 Esprit/round)",
    gmNotes: "Insensible aux armes à feu. Dispersé par les extincteurs CO2 ou expulsé par la ventilation lourde.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/monstre_spectre_resonance.jpg",
    body: 12,
    spirit: 12,
    isAntagonist: true
  },
  {
    id: "parasites",
    name: "Les Parasites de Cendre",
    subfolder: "3. Monstres & Menaces",
    profession: "Nuée furtive des conduits",
    background: "Essaim d'arthropodes d'obsidienne de la taille d'une main nichés par centaines dans les gaines de ventilation.",
    equipment: "Morsures nécrosantes multiples sous les vêtements",
    gmNotes: "Sensibles au feu et aux sprays inflammables. Inefficaces contre les combinaisons Hazmat étanches.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/monstre_parasites_cendre.jpg",
    body: 8,
    spirit: 2,
    isAntagonist: true
  },
  {
    id: "commando",
    name: "Commando « Ardoise Noire »",
    subfolder: "3. Monstres & Menaces",
    profession: "Opérateur tactique GIS-4",
    background: "Unité d'élite d'intervention noire en combinaison pressurisée avec masque thermique. Ordre de purge totale sans sommation.",
    equipment: "HK MP5-SD silencieux (2 Blessures), Masque thermique IR, Gilet pare-balles (-1 dégâts), Grenade phosphore, Charges C4",
    gmNotes: "Avance en binômes. Fusille les survivants et pose du plastic sur les serveurs.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_capitaine_vane.jpg",
    body: 14,
    spirit: 10,
    isAntagonist: true
  },
  {
    id: "vane",
    name: "Capitaine Vane",
    subfolder: "3. Monstres & Menaces",
    profession: "Commandant de l'unité Ardoise Noire",
    background: "Chef impitoyable de l'opération de nettoyage. Voix froide filtrée par radio. Exécute les ordres d'État sans état d'âme.",
    equipment: "HK MP5-SD silencieux, Pistolet 9mm, Détonateur radio C4, Tablette tactique avec directive Black Slate",
    gmNotes: "Possède la preuve formelle que le gouvernement ordonne l'exécution des témoins.",
    img: "systems/sombre-classic-house/assets/scenarios/helix-2008/tokens/pnj_capitaine_vane.jpg",
    body: 16,
    spirit: 12,
    isAntagonist: true
  }
];

const ALL_CHARACTERS = [...PCS, ...NPCS, ...MONSTERS];

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

const normalizedName = (value) => String(value ?? "").trim().toLocaleLowerCase("fr");

const playerUserFor = (character) => {
  if (!character.playerName) return null;
  const expected = normalizedName(character.playerName);
  return game.users.find((user) => normalizedName(user.name) === expected) ?? null;
};

const tokenNameFor = (character) => (
  character.playerName ? `${character.name} - ${character.playerName}` : character.name
);

const ownershipFor = (character) => {
  const player = playerUserFor(character);
  const ownership = { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE };
  if (player) ownership[player.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  return ownership;
};

const actorData = (character, folderId) => ({
  name: character.name,
  type: "victime",
  img: character.img || "icons/svg/mystery-man.svg",
  folder: folderId,
  ownership: ownershipFor(character),
  flags: { [SYSTEM_ID]: { helix2008Id: character.id } },
  prototypeToken: {
    name: tokenNameFor(character),
    actorLink: true,
    texture: { src: character.img || "icons/svg/mystery-man.svg" },
    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
  },
  system: {
    scenarioId: "helix-2008",
    isAntagonist: Boolean(character.isAntagonist),
    playerName: character.playerName || "",
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
      body: {
        value: character.body,
        max: character.isAntagonist ? Math.max(12, character.body) : 12
      },
      spirit: { value: character.spirit, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    background: character.background,
    equipment: character.equipment,
    secret: "",
    secretKind: "",
    specialUsed: false,
    infected: false,
    gmNotes: character.gmNotes || ""
  }
});

const syncPlayerCharacters = async () => {
  const missingUsers = [];

  for (const character of PCS) {
    const actor = game.actors.find((candidate) => candidate.getFlag(SYSTEM_ID, "helix2008Id") === character.id);
    if (!actor) continue;

    const player = playerUserFor(character);
    if (!player) missingUsers.push(character.playerName);

    const tokenName = tokenNameFor(character);
    await actor.update({
      ownership: ownershipFor(character),
      "system.playerName": character.playerName,
      "system.background": character.background,
      "system.equipment": character.equipment,
      "prototypeToken.name": tokenName,
      "prototypeToken.actorLink": true,
      "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS
    });

    for (const scene of game.scenes) {
      const updates = scene.tokens
        .filter((token) => token.actorId === actor.id)
        .map((token) => ({
          _id: token.id,
          actorLink: true,
          name: tokenName,
          displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
        }));
      if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
    }
  }

  if (missingUsers.length) {
    ui.notifications.warn(`Utilisateurs Foundry introuvables : ${[...new Set(missingUsers)].join(", ")}. Les pseudos sont inscrits sur les fiches, mais l'ownership devra être attribué après leur création.`);
  }
};

const createCharacters = async () => {
  const rootFolder = await ensureActorFolder(ROOT_FOLDER_NAME);
  const scenarioFolder = await ensureActorFolder(SCENARIO_FOLDER_NAME, rootFolder.id);

  // Subfolders for organized layout
  const pcFolder = await ensureActorFolder("1. Personnages Joueurs", scenarioFolder.id);
  const npcFolder = await ensureActorFolder("2. PNJ Survivants", scenarioFolder.id);
  const monsterFolder = await ensureActorFolder("3. Monstres & Menaces", scenarioFolder.id);

  const folderMap = {
    "1. Personnages Joueurs": pcFolder.id,
    "2. PNJ Survivants": npcFolder.id,
    "3. Monstres & Menaces": monsterFolder.id
  };

  const existingIds = new Set(game.actors.map((actor) => actor.getFlag(SYSTEM_ID, "helix2008Id")).filter(Boolean));
  const missing = ALL_CHARACTERS.filter((character) => !existingIds.has(character.id));

  if (missing.length) {
    await Actor.createDocuments(missing.map((character) => actorData(character, folderMap[character.subfolder])));
  }

  await syncPlayerCharacters();

  if (missing.length) {
    ui.notifications.info(`${missing.length} fiches créées dans HÉLIX 2008 ; PJ attribués et tokens synchronisés.`);
  } else {
    ui.notifications.info("Fiches HÉLIX 2008 déjà présentes : inventaires, backgrounds, ownerships et tokens des PJ ont été synchronisés.");
  }
};

const confirmCreation = () => {
  new Dialog({
    title: "Créer les fiches — HÉLIX 2008",
    content: [
      "<p>Créer le dossier <strong>Scénarios personnalisés / HÉLIX 2008</strong> avec :</p>",
      "<ul>",
      "<li><strong>5 Personnages Joueurs</strong> avec inventaires légers et ownership attribué</li>",
      "<li><strong>5 PNJ Survivants</strong> (Serge, Claire, Zimmerman, Marc, Élodie)</li>",
      "<li><strong>5 Monstres & Menaces</strong> (Rôdeur de Faille, Spectre, Parasites, Commandos, Capitaine Vane)</li>",
      "</ul>",
      "<p>Les fiches déjà présentes ne seront pas dupliquées ; les données des cinq PJ seront synchronisées.</p>"
    ].join(""),
    buttons: {
      create: {
        icon: '<i class="fa-solid fa-user-plus"></i>',
        label: "Créer les 15 fiches",
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
    const button = $('<button type="button" data-create-helix-2008 title="Créer les fiches d’HÉLIX 2008 (PJ, PNJ, Monstres)"><i class="fa-solid fa-atom"></i> HÉLIX 2008</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
