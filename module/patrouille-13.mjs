const SYSTEM_ID = "sombre-classic-house";
const ROOT_FOLDER_NAME = "Scénarios personnalisés";
const SCENARIO_FOLDER_NAME = "PATROUILLE 13";
const ASSET_ROOT = "systems/sombre-classic-house/assets/scenarios/patrouille-13";

const pc = (id, name, playerName, body, spirit, personality, advantage, disadvantage, background, equipment, positiveLink, secret, disadvantageDescription = "") => ({
  id, name, playerName, body, spirit, personality, advantage, disadvantage,
  background, equipment, positiveLink, secret, disadvantageDescription,
  subfolder: "1. Personnages Joueurs",
  profession: "Agent de police",
  isAntagonist: false
});

const npc = (id, name, profession, body, spirit, background, equipment, gmNotes = "", isAntagonist = false) => ({
  id, name, profession, body, spirit, background, equipment, gmNotes, isAntagonist,
  subfolder: isAntagonist ? "3. Menaces" : "2. Personnages Non-Joueurs",
  personality: 0,
  advantage: "",
  disadvantage: ""
});

const PCS = [
  pc(
    "joel-santi", "Joël Santi", "Crevetolog", 12, 8, 7, "Chef", "Écervelé",
    "Brigadier qui parle comme un manuel de procédure qu’il n’a jamais lu. Il transforme toute discussion en briefing, répète « situation sous contrôle » quand elle ne l’est pas et attend sa promotion depuis onze ans.",
    "Pistolet de service, 2 chargeurs, matraque télescopique, menottes, radio, lampe ; bélier léger dans le coffre.",
    "Mélanie est sa partenaire et, selon lui, son élève. Elle corrige discrètement ses rapports depuis deux ans.",
    "Lefort connaît la vérité sur une interpellation ratée que Joël a maquillée en panne de véhicule."
  ),
  pc(
    "melanie-roussel", "Mélanie Roussel", "Pikiou", 10, 10, 16, "Tir", "Code de conduite",
    "Policière rassurée seulement lorsque les faits entrent dans une case. Elle cite des numéros d’articles faux avec une précision impeccable, photographie tout et déteste qu’on déplace une pièce à conviction.",
    "Pistolet de service, 2 chargeurs, tonfa, menottes, radio, lampe, carnet, gants nitrile.",
    "Elle protège la réputation de Joël parce qu’un scandale sur leur patrouille ruinerait aussi sa carrière.",
    "Elle a déjà croisé Varga pendant sa garde à vue ; il se souvient qu’elle tire de la main gauche.",
    "Identifier clairement une cible avant de tirer ; annoncer toute entorse à la procédure dans le rapport. Transgresser ce code provoque des Séquelles."
  ),
  pc(
    "tony-cherif", "Tony Cherif", "Grelot", 12, 8, 3, "Fort", "Panique",
    "Policier influenceur qui connaît tous les commerçants, tutoie les suspects et diffuse des conseils de sécurité. Il confond aisance sociale et compétence tactique.",
    "Pistolet de service, 2 chargeurs, aérosol incapacitant, menottes, radio, lampe, téléphone sur stabilisateur.",
    "Léa est la seule collègue qui accepte encore de patrouiller avec lui, principalement pour surveiller ce qu’il publie.",
    "Il a participé à l’arrestation de Varga et s’en attribue publiquement tout le mérite. Varga reconnaît sa voix."
  ),
  pc(
    "lea-bouchard", "Léa Bouchard", "Max", 8, 12, 20, "Vigilant", "Panne",
    "Policière paranoïaque qui relie entre eux véhicules sans plaque, coupures de réseau et changements de café au commissariat. Une théorie sur dix est assez exacte pour entretenir les neuf autres.",
    "Pistolet de service, 2 chargeurs, taser, menottes, radio, lampe, jumelles compactes, trois batteries externes dont une gonflée.",
    "Elle est convaincue que Tony travaille parfois pour les Affaires internes. Tony croit qu’elle plaisante.",
    "Elle a transmis le matin même un message anonyme annonçant « Varga ne verra jamais l’hôpital ». Le central l’a classé comme divagation."
  )
];

const NPCS = [
  npc("nora-benali", "Nora Benali", "Ambulancière prise en otage", 8, 10,
    "Blessée au front mais lucide. Elle veut survivre et empêcher Varga d’obtenir un véhicule ; elle ralentit, ment sur le bâtiment et profite de toute distraction.",
    "Tenue d’ambulancière, ciseaux Jesco, téléphone déchargé.",
    "A caché les clés de l’ambulance sous une poubelle de tri dans l’atrium."),
  npc("patrice-lefort", "Patrice Lefort", "Policier grièvement blessé", 10, 8,
    "Agent arrivé seul et désarmé par Varga. Blessé au ventre près du parking, il minimise stupidement son état et veut qu’on poursuive le fugitif.",
    "Téléphone qui vibre ; uniforme, radio, gilet et armes volés.",
    "Connaît la vérité sur l’interpellation ratée de Joël. Sans stabilisation, il meurt avant la fin."),
  npc("hugo-klein", "Hugo Klein", "Surveillant pénitentiaire blessé", 10, 8,
    "Coincé sous le tableau de bord de l’ambulance, blessé au ventre et presque incohérent.",
    "Uniforme pénitentiaire, trousseau de menottes.",
    "Peut souffler : « chaussure », « la fille est vivante » et « il écoute la radio »."),
  npc("samir-ouali", "Samir Ouali", "Agent de sécurité de Bellevue Forum", 10, 10,
    "Enfermé dans le poste de sécurité. Il a vu Varga frapper Lefort, mais connaît les vidéos de Tony et le juge dangereux.",
    "Bombe lacrymogène, matraque, clés de voiture, commandes des caméras et rideaux.",
    "Peut lever un rideau à la fois, déverrouiller le quai nord ou rallumer certaines zones."),
  npc("sofiane", "Sofiane", "Voleur de catalyseur paniqué", 8, 8,
    "Jeune voleur qui a trouvé Lefort et pris son pistolet pour se défendre. Une sommation agressive déclenche sa panique, pas une intention meurtrière.",
    "Pistolet de Lefort avec sûreté, lampe, cric.",
    "A vu Varga en gilet de police pousser Nora vers l’atrium."),
  npc("mael", "Maël", "Complice de Sofiane", 8, 8,
    "Complice terrifié qui veut abandonner Sofiane et courir dès que les policiers approchent.",
    "Clés d’une fourgonnette, outils de vol de catalyseur.",
    "Confirmera le signalement de Varga s’il se sent à l’abri."),
  npc("elise-vautrin", "Élise Vautrin", "Pharmacienne", 8, 10,
    "Cachée dans la pharmacie avec Marc blessé. Elle peut traiter une blessure mais juge le centre trop dangereux pour ouvrir le rideau.",
    "Trousse médicale, antalgiques puissants, clés de la pharmacie.",
    "Marc a vu Nora cacher les clés de l’ambulance."),
  npc("marc-vautrin", "Marc Vautrin", "Civil blessé", 8, 8,
    "Compagnon d’Élise, touché à la cuisse par une balle perdue. Il veut quitter la pharmacie immédiatement.",
    "Téléphone, garrot improvisé.",
    "A vu Nora glisser les clés de l’ambulance sous une poubelle de tri dans l’atrium."),
  npc("equipe-nettoyage", "Équipe de nettoyage du cinéma", "Cinq civils non déclarés", 8, 8,
    "Irina veut attendre ; Moussa barricade ; Pavel possède les clés du fourgon ; Ana cherche son fils Noé, caché dans la cabine de projection.",
    "Clés du fourgon de nettoyage, chariot, produits, téléphones.",
    "Noé a vu « un policier traîner une dame ». Les civils paniquent à chaque détonation."),
  npc("commissaire-valette", "Commissaire Valette", "Coordinatrice au commissariat", 8, 10,
    "Prudente, contradictoire et terrifiée à l’idée d’endosser quatre morts supplémentaires. Elle veut figer le périmètre et attendre l’unité spécialisée.",
    "Radio du central, moyens de commandement à distance.",
    "N’est pas corrompue. Ses renseignements sont seulement incomplets et en retard."),
  npc("elias-varga", "Élias Varga", "Le Boucher de Bellevue", 12, 12,
    "Tueur évadé, patient, observateur et sans empathie. Il avance vers le quai nord avec Nora, écoute la fréquence de police, frappe vite et change d’endroit.",
    "Fusil à pompe de Lefort (4 cartouches), lame en céramique, radio et gilet pare-balles de Lefort.",
    "Deux côtes cassées : courir longtemps ou subir un choc violent lui coûte 1 Blessure. Le gilet réduit de 1 les tirs au torse.", true)
];

const ALL_CHARACTERS = [...PCS, ...NPCS];
const folderParentId = (folder) => folder?.folder?.id ?? folder?.folder ?? null;
const normalizedName = (value) => String(value ?? "").trim().toLocaleLowerCase("fr");
const tokenNameFor = (character) => character.playerName ? `${character.name} - ${character.playerName}` : character.name;

const findActorFolder = (name, parentId = null) => game.folders.find((folder) => (
  folder.type === "Actor" && folder.name === name && folderParentId(folder) === parentId
));
const ensureActorFolder = async (name, parentId = null) => (
  findActorFolder(name, parentId) ?? Folder.create({ name, type: "Actor", folder: parentId })
);
const playerUserFor = (character) => {
  if (!character.playerName) return null;
  const expected = normalizedName(character.playerName);
  return game.users.find((user) => normalizedName(user.name) === expected) ?? null;
};
const ownershipFor = (character) => {
  const ownership = { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE };
  const player = playerUserFor(character);
  if (player) ownership[player.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  return ownership;
};

const actorData = (character, folderId) => {
  const image = `${ASSET_ROOT}/tokens/${character.id}.svg`;
  return {
    name: character.name,
    type: "victime",
    img: image,
    folder: folderId,
    ownership: ownershipFor(character),
    flags: { [SYSTEM_ID]: { patrouille13Id: character.id } },
    prototypeToken: {
      name: tokenNameFor(character), actorLink: true,
      texture: { src: image }, displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
    },
    system: {
      scenarioId: "patrouille-13",
      isAntagonist: Boolean(character.isAntagonist),
      playerName: character.playerName || "",
      profession: character.profession,
      nameRandomLocked: true,
      professionRandomLocked: true,
      positiveLink: character.positiveLink || "",
      specialCard: "",
      personality: character.personality ?? 0,
      personalityRandomUsed: true,
      personalityRandomLocked: true,
      advantage: character.advantage || "",
      advantageDescription: character.advantageDescription || "",
      disadvantage: character.disadvantage || "",
      disadvantageDescription: character.disadvantageDescription || "",
      advantageRandomUsed: true,
      advantageRandomLocked: true,
      disadvantageRandomUsed: true,
      disadvantageRandomLocked: true,
      traitsRandomUsed: true,
      traitsRandomLocked: true,
      adrenalinePending: false,
      resources: {
        body: { value: character.body, max: character.isAntagonist ? Math.max(12, character.body) : 12 },
        spirit: { value: character.spirit, max: 12 },
        adrenaline: { value: 0, max: 3 }
      },
      background: character.background,
      equipment: character.equipment,
      secret: character.secret || "",
      secretKind: character.secret ? "Secret" : "",
      specialUsed: false,
      infected: false,
      gmNotes: character.gmNotes || ""
    }
  };
};

const syncCharacters = async () => {
  const missingUsers = [];
  for (const character of ALL_CHARACTERS) {
    const actor = game.actors.find((candidate) => candidate.getFlag(SYSTEM_ID, "patrouille13Id") === character.id);
    if (!actor) continue;
    if (character.playerName && !playerUserFor(character)) missingUsers.push(character.playerName);
    const data = actorData(character, actor.folder?.id ?? actor.folder);
    delete data.folder;
    await actor.update(data);

    for (const scene of game.scenes) {
      const updates = scene.tokens
        .filter((token) => token.actorId === actor.id)
        .map((token) => ({
          _id: token.id,
          actorLink: true,
          name: data.prototypeToken.name,
          displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
          "texture.src": data.prototypeToken.texture.src
        }));
      if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
    }
  }
  if (missingUsers.length) {
    ui.notifications.warn(`Utilisateurs Foundry introuvables : ${[...new Set(missingUsers)].join(", ")}. Les pseudos restent inscrits ; attribuez les fiches après création des utilisateurs.`);
  }
};

const createCharacters = async () => {
  const rootFolder = await ensureActorFolder(ROOT_FOLDER_NAME);
  const scenarioFolder = await ensureActorFolder(SCENARIO_FOLDER_NAME, rootFolder.id);
  const pcFolder = await ensureActorFolder("1. Personnages Joueurs", scenarioFolder.id);
  const npcFolder = await ensureActorFolder("2. Personnages Non-Joueurs", scenarioFolder.id);
  const menaceFolder = await ensureActorFolder("3. Menaces", scenarioFolder.id);
  const folderMap = {
    "1. Personnages Joueurs": pcFolder.id,
    "2. Personnages Non-Joueurs": npcFolder.id,
    "3. Menaces": menaceFolder.id
  };
  const existingIds = new Set(game.actors.map((actor) => actor.getFlag(SYSTEM_ID, "patrouille13Id")).filter(Boolean));
  const missing = ALL_CHARACTERS.filter((character) => !existingIds.has(character.id));
  if (missing.length) {
    await Actor.createDocuments(missing.map((character) => actorData(character, folderMap[character.subfolder])));
  }
  await syncCharacters();
  const conductorPath = `${ASSET_ROOT}/conducteur-patrouille-13.html`;
  ui.notifications.info(`${missing.length ? `${missing.length} fiches créées` : "Fiches synchronisées"} dans PATROUILLE 13. Conducteur : ${conductorPath}`);
};

const confirmCreation = () => {
  new Dialog({
    title: "Créer les fiches — PATROUILLE 13",
    content: [
      "<p>Créer ou synchroniser <strong>Scénarios personnalisés / PATROUILLE 13</strong> :</p>",
      "<ul><li><strong>4 PJ</strong> attribués à Crevetolog, Pikiou, Grelot et Max</li>",
      "<li><strong>10 PNJ</strong> avec objectifs, équipement et informations MJ</li>",
      "<li><strong>1 Menace</strong> : Élias Varga</li></ul>",
      "<p>Les fiches existantes ne seront pas dupliquées. Les données du scénario seront resynchronisées.</p>"
    ].join(""),
    buttons: {
      create: { icon: '<i class="fa-solid fa-car-side"></i>', label: "Créer les 15 fiches", callback: createCharacters },
      cancel: { icon: '<i class="fa-solid fa-xmark"></i>', label: "Annuler" }
    },
    default: "cancel"
  }).render(true);
};

export const registerPatrouille13Generator = () => {
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-patrouille-13]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-patrouille-13 title="Créer les fiches de Patrouille 13"><i class="fa-solid fa-car-side"></i> Patrouille 13</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
