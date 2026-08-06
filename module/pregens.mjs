const SYSTEM_ID = "sombre-classic-house";
const PREGENS_VERSION = "7";
const LEGACY_HOUSE_FOLDER = "Prétirés — House";

const HOUSE_PREGENS = [
  {
    id: "calvin-brooks",
    name: "Calvin Brooks",
    profession: "Chauffeur de bus municipal",
    personality: 7,
    advantage: "Tir",
    disadvantage: "Code de conduite",
    positiveLink: [
      "Linda Brooks — ma petite sœur. Elle est la seule à pouvoir me dire que j’ai tort.",
      "David Brooks — mon petit frère. Je dois le garder en vie, même contre son avis.",
      "Elena Morales — une amie de confiance qui me dit la vérité, même lorsqu’elle fait mal.",
      "Gabriel Morales — je l’ai vu grandir et je le considère comme un membre de ma famille."
    ].join("\n\n"),
    background: "Chauffeur de bus et chasseur occasionnel, Calvin a toujours protégé son frère et sa sœur, mais doute désormais des décisions qui ont fait de lui le chef du groupe."
  },
  {
    id: "linda-brooks",
    name: "Linda Brooks",
    profession: "Coiffeuse",
    personality: 20,
    advantage: "Endurci",
    disadvantage: "Cauchemars",
    positiveLink: [
      "Calvin Brooks — mon grand frère. Je l’aime, mais je refuse de le laisser décider seul pour tous.",
      "David Brooks — mon petit frère et mon ancien complice ; je le comprends souvent mieux que Calvin.",
      "Elena Morales — ma meilleure amie depuis l’adolescence ; c’est la seule à qui j’avoue mes peurs.",
      "Gabriel Morales — le petit frère de ma meilleure amie, que je considère presque comme le mien."
    ].join("\n\n"),
    background: "Coiffeuse attentive aux autres, Linda cherche à maintenir les deux familles unies et refuse désormais de laisser Calvin prendre seul toutes les décisions."
  },
  {
    id: "david-brooks",
    name: "David Brooks",
    profession: "Vendeur de quincaillerie",
    personality: 21,
    advantage: "Fort",
    disadvantage: "Trauma",
    positiveLink: [
      "Calvin Brooks — mon grand frère et mon modèle ; je veux qu’il me traite enfin comme son égal.",
      "Linda Brooks — ma grande sœur et ma confidente ; elle sait désamorcer mes disputes avec Calvin.",
      "Elena Morales — elle a toujours veillé sur Gabe et sur moi lorsque nous étions plus jeunes.",
      "Gabriel Morales — mon meilleur ami depuis l’enfance, le frère que j’ai choisi."
    ].join("\n\n"),
    background: "Employé de quincaillerie débrouillard, David sait improviser des réparations et veut enfin prouver à Calvin qu’il n’est plus un enfant."
  },
  {
    id: "elena-morales",
    name: "Elena Morales",
    profession: "Aide-soignante",
    personality: 0,
    advantage: "Lucidité",
    disadvantage: "Dévoué",
    positiveLink: [
      "Calvin Brooks — un ami fiable dont je respecte le calme, même lorsque je conteste ses décisions.",
      "Linda Brooks — ma meilleure amie ; elle est la seule devant qui j’accepte de montrer ma peur.",
      "David Brooks — le meilleur ami de Gabriel ; je lui fais confiance pour veiller sur mon frère.",
      "Gabriel Morales — mon petit frère ; je me suis juré de ne jamais l’abandonner."
    ].join("\n\n"),
    background: "Aide-soignante habituée à protéger les autres, Elena sait reconnaître une blessure grave mais reste incapable d’envisager d’abandonner son petit frère."
  },
  {
    id: "gabriel-morales",
    name: "Gabriel Morales",
    profession: "Ouvrier dans un ranch",
    personality: 14,
    advantage: "Tir",
    disadvantage: "Écervelé",
    positiveLink: [
      "Calvin Brooks — une figure d’autorité que je respecte, même si je n’aime pas recevoir ses ordres.",
      "Linda Brooks — elle m’écoute sans me traiter comme un enfant et fait partie de ma famille depuis toujours.",
      "David Brooks — mon meilleur ami depuis l’enfance ; s’il reste derrière, je reste avec lui.",
      "Elena Morales — ma grande sœur ; je lui dois énormément, même si sa protection m’étouffe parfois."
    ].join("\n\n"),
    background: "Ouvrier de ranch sachant conduire et tirer, Gabriel prend volontiers des risques pour prouver à Elena qu’il n’a plus besoin de sa protection."
  }
];

const UBIQUITE_PREGENS = Array.from({ length: 5 }, (_, index) => ({
  id: `ubiquite-x-${index + 1}`,
  name: `X ${index + 1}`,
  profession: "Homme brutal",
  personality: 2,
  advantage: "Ambidextre",
  disadvantage: "Amnésique",
  equipment: "Un couteau Bowie ensanglanté. Aucun vêtement ni autre objet.",
  background: "Homme blanc d’une trentaine d’années, brun au crâne rasé, bouc taillé, corps musclé et tatouages octogonaux rouges. Aucun souvenir.",
  resources: {
    body: { value: 12, max: 12 },
    spirit: { value: 10, max: 12 },
    adrenaline: { value: 0, max: 3 }
  }
}));

const DEEP_SPACE_GORE_PJ = [
  {
    id: "deep-space-gore-moreau",
    name: "Moreau",
    profession: "Pilote du Déméter",
    personality: 7,
    advantage: "Tir",
    disadvantage: "",
    equipment: "Clé anglaise.",
    background: "Pilote blonde, disciplinée et efficace sous pression.",
    gmNotes: "Cinquième membre du cast : à écarter en priorité si la partie n’a que quatre joueurs."
  },
  {
    id: "deep-space-gore-wong",
    name: "Wong",
    profession: "Médecin du Déméter",
    personality: 16,
    advantage: "",
    disadvantage: "",
    equipment: "Scalpel.",
    background: "Médecin asiatique méthodique, responsable de la santé de l’équipage.",
    secretKind: "ability",
    secret: "Ma trousse d’urgence est restée au bloc médical. Une fois récupérée, sa dose de nanites peut soigner 1 Blessure, une seule fois.",
    gmNotes: "La trousse peut soigner Wong lui-même. Elle ne décontamine pas et ne réanime pas."
  },
  {
    id: "deep-space-gore-grimm",
    name: "Grimm",
    profession: "Xénobiologiste",
    personality: 12,
    advantage: "",
    disadvantage: "Invalide",
    equipment: "Hache d’incendie.",
    background: "Xénobiologiste noir blessé lors de l’attaque du spécimen alien.",
    secretKind: "secret",
    secret: "Le Crabe m’a infecté. J’espère que la stase suspendra la contamination jusqu’à ce qu’on puisse me soigner sur Titan.",
    infected: true,
    resources: {
      body: { value: 8, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: "La stase ne bloque pas la contamination. Grimm reste capable de marcher, agir et se battre."
  },
  {
    id: "deep-space-gore-roach",
    name: "Roach",
    profession: "Technicien du Déméter",
    personality: 20,
    advantage: "",
    disadvantage: "",
    equipment: "Torche à plasma : arme de contact, flux thermique de 20 cm, batterie pleine, n’éclaire pas.",
    background: "Technicien blanc prudent, chargé de maintenir les systèmes du Déméter.",
    secretKind: "ability",
    secret: "Une fois dans la partie, je peux condamner une porte coulissante fermée avec ma torche à plasma : elle ne pourra plus s’ouvrir.",
    gmNotes: "La torche ne demande pas d’appui en microgravité. La capacité ne fonctionne qu’une fois."
  },
  {
    id: "deep-space-gore-vasquez",
    name: "Vasquez",
    profession: "Agronome du Déméter",
    personality: 21,
    advantage: "Tir",
    disadvantage: "",
    equipment: "Aucune arme au départ.",
    background: "Agronome hispanique rebelle, responsable de la serre hydroponique.",
    secretKind: "secret",
    secret: "J’ai introduit un Glock en contrebande et l’ai enterré dans l’un des bacs hydroponiques de la serre.",
    gmNotes: "Le Glock est dans le bac le plus éloigné de la porte, possède assez de munitions et ignore Carapace."
  }
];

const DEEP_SPACE_GORE_ANTAGONISTS = [
  {
    id: "deep-space-gore-hayes",
    name: "Hayes",
    profession: "Hybride — capitaine du Déméter",
    personality: 2,
    advantage: "",
    disadvantage: "",
    equipment: "Pattes acérées. Carapace : chaque attaque reçue ne cause que 1 Blessure ; le Glock annule cette protection.",
    background: "Hayes, capitaine du Déméter, contaminé et métamorphosé en Hybride.",
    infected: true,
    resources: {
      body: { value: 10, max: 12 },
      spirit: { value: 0, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: "Adaptation Classic : Corps 10. Toute personne blessée par Hayes est infectée."
  },
  {
    id: "deep-space-gore-crabe",
    name: "Le Crabe",
    profession: "Xénomorphe",
    personality: 2,
    advantage: "",
    disadvantage: "",
    equipment: "Pattes acérées. Carapace : 1 Blessure par attaque, sauf Glock. Ténèbres : indécelable dans l’obscurité.",
    background: "Spécimen extraterrestre non répertorié récupéré dans l’espace.",
    infected: true,
    resources: {
      body: { value: 12, max: 12 },
      spirit: { value: 0, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: "Adaptation Classic : Corps 12. Ténèbres le rend indécelable même avec vision nocturne, infrarouge ou thermique."
  }
];

const AUCUN_ACCORD_PJ = [
  {
    id: "aucun-accord-cadre",
    name: "Thomas",
    profession: "Cadre supérieur de la banque",
    personality: 17,
    advantage: "Notable",
    disadvantage: "Code de conduite",
    equipment: "Téléphone professionnel, badge de cadre et codes d’accès professionnels.",
    background: "Cadre supérieur méthodique, Thomas commence sa journée par un entretien d’embauche dans son bureau.",
    resources: {
      body: { value: 8, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-plombier",
    name: "Laurent",
    profession: "Plombier-chauffagiste",
    personality: 21,
    advantage: "Fort",
    disadvantage: "Maladroit",
    equipment: "Lampe frontale et quelques outils de poche. La caisse à outils complète est restée dans le local technique.",
    background: "Technicien indépendant expérimenté, Laurent intervient aujourd’hui sur une climatisation défaillante.",
    resources: {
      body: { value: 12, max: 12 },
      spirit: { value: 10, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-avocate",
    name: "Marion",
    profession: "Avocate",
    personality: 17,
    advantage: "Lucidité",
    disadvantage: "Code de conduite",
    equipment: "Téléphone, dossier de succession, mandat professionnel et nécessaire de prise de notes.",
    background: "Avocate rigoureuse, Marion doit aujourd’hui inventorier le contenu d’un coffre dans le cadre d’une succession.",
    resources: {
      body: { value: 8, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    secretKind: "",
    secret: "",
    gmNotes: ""
  },
  {
    id: "aucun-accord-entretien",
    name: "Sonia",
    profession: "Agent d’entretien",
    personality: 21,
    advantage: "Vigilant",
    disadvantage: "Chétif",
    equipment: "Trousseau de service, chariot, produits ménagers, cutter et petits outils.",
    background: "Agente d’entretien attentive et débrouillarde, Sonia connaît parfaitement les habitudes et les défauts du bâtiment.",
    resources: {
      body: { value: 10, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-securite",
    name: "David",
    profession: "Agent de sécurité bancaire",
    personality: 7,
    advantage: "Vigilant",
    disadvantage: "Code de conduite",
    equipment: "Radio, lampe et badge de sécurité. Il n’est pas armé.",
    background: "Agent de sécurité consciencieux, David commence son service par les contrôles ordinaires des accès et des caméras.",
    resources: {
      body: { value: 10, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  }
];

const AUCUN_ACCORD_BRAQUEURS = [
  {
    id: "aucun-accord-victor",
    name: "Victor",
    profession: "Chef des braqueurs",
    personality: 23,
    advantage: "Chef",
    disadvantage: "Ennemi mortel",
    equipment: "Pistolet, chargeur de rechange, cagoule et radio.",
    background: "Chef calme, méthodique et autoritaire, Victor garde toujours une partie de son plan pour lui.",
    resources: {
      body: { value: 12, max: 12 },
      spirit: { value: 10, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-nadia",
    name: "Nadia",
    profession: "Braqueuse",
    personality: 18,
    advantage: "Tir",
    disadvantage: "Panique",
    equipment: "Pistolet, cagoule, colliers de serrage et sac à billets.",
    background: "Nadia paraît déterminée, mais supporte mal les situations qu’elle ne contrôle plus.",
    resources: {
      body: { value: 10, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-remi",
    name: "Rémi",
    profession: "Braqueur violent",
    personality: 2,
    advantage: "Fort",
    disadvantage: "Écervelé",
    equipment: "Fusil à canon scié, pistolet, cagoule et munitions.",
    background: "Rémi est brutal, impatient et convaincu que la violence résout tous les problèmes.",
    resources: {
      body: { value: 12, max: 12 },
      spirit: { value: 8, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  },
  {
    id: "aucun-accord-lucas",
    name: "Lucas",
    profession: "Technicien des braqueurs",
    personality: 17,
    advantage: "Lascar",
    disadvantage: "Chétif",
    equipment: "Pistolet, outils d’effraction, perceuse compacte, cagoule et radio.",
    background: "Technicien prudent et discret, Lucas maîtrise les serrures, les alarmes et les outils d’effraction.",
    resources: {
      body: { value: 10, max: 12 },
      spirit: { value: 12, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    gmNotes: ""
  }
];

const classicActorData = (pregen, folderId, scenarioId = "house") => ({
  name: pregen.name,
  type: "victime",
  img: "icons/svg/mystery-man.svg",
  folder: folderId,
  flags: {
    [SYSTEM_ID]: {
      pregenId: pregen.id,
      scenarioId
    }
  },
  system: {
    scenarioId,
    playerName: "",
    profession: pregen.profession,
    nameRandomLocked: true,
    professionRandomLocked: true,
    positiveLink: pregen.positiveLink,
    specialCard: "",
    personality: pregen.personality,
    personalityRandomUsed: true,
    personalityRandomLocked: true,
    advantage: pregen.advantage,
    advantageDescription: "",
    disadvantage: pregen.disadvantage,
    disadvantageDescription: "",
    advantageRandomUsed: false,
    advantageRandomLocked: false,
    disadvantageRandomUsed: false,
    disadvantageRandomLocked: false,
    traitsRandomUsed: true,
    traitsRandomLocked: true,
    adrenalinePending: false,
    background: pregen.background,
    equipment: pregen.equipment ?? "",
    secret: pregen.secret ?? "",
    secretKind: pregen.secretKind ?? "",
    specialUsed: false,
    infected: pregen.infected ?? false,
    gmNotes: pregen.gmNotes ?? "",
    ...(pregen.resources ? { resources: pregen.resources } : {})
  }
});

export const registerPregenSetting = () => {
  game.settings.register(SYSTEM_ID, "pregensVersion", {
    name: "Version des prétirés installés",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });
};

export const createPregensOnce = async () => {
  if (!game.user.isGM) return;
  if (game.settings.get(SYSTEM_ID, "pregensVersion") === PREGENS_VERSION) return;

  const parentId = (entry) => entry.folder?.id ?? entry.folder ?? null;
  const ensureFolder = async (name, parent = null) => {
    const expectedParent = parent?.id ?? null;
    let folder = game.folders.find((entry) => (
      entry.type === "Actor"
      && entry.name === name
      && parentId(entry) === expectedParent
    ));
    if (!folder) {
      folder = await Folder.create({ name, type: "Actor", folder: expectedParent });
    }
    return folder;
  };

  const sombre01 = await ensureFolder("Sombre 01");
  const sombre02 = await ensureFolder("Sombre 02");
  const sombre03 = await ensureFolder("Sombre 03");

  let houseFolder = game.folders.find((entry) => (
    entry.type === "Actor"
    && [LEGACY_HOUSE_FOLDER, "House of the Rising Dead"].includes(entry.name)
  ));
  if (houseFolder) {
    const update = {};
    if (houseFolder.name !== "House of the Rising Dead") update.name = "House of the Rising Dead";
    if (parentId(houseFolder) !== sombre01.id) update.folder = sombre01.id;
    if (Object.keys(update).length) await houseFolder.update(update);
  } else {
    houseFolder = await ensureFolder("House of the Rising Dead", sombre01);
  }

  const ubiquiteFolder = await ensureFolder("Ubiquité", sombre02);
  const deepSpaceFolder = await ensureFolder("Deep Space Gore", sombre03);
  const deepSpacePjFolder = await ensureFolder("Prétirés", deepSpaceFolder);
  const deepSpaceAntagonistFolder = await ensureFolder("Antagonistes", deepSpaceFolder);
  const customFolder = await ensureFolder("Scénarios custom");
  const aucunAccordFolder = await ensureFolder("Aucun accord", customFolder);
  const aucunAccordPjFolder = await ensureFolder("Personnages joueurs", aucunAccordFolder);
  const aucunAccordBraqueursFolder = await ensureFolder("Braqueurs", aucunAccordFolder);

  const existingById = new Map(
    game.actors
      .map((actor) => [actor.getFlag(SYSTEM_ID, "pregenId"), actor])
      .filter(([id]) => Boolean(id))
  );

  const groups = [
    { pregens: HOUSE_PREGENS, folder: houseFolder, actorData: (pregen) => classicActorData(pregen, houseFolder.id, "house") },
    { pregens: UBIQUITE_PREGENS, folder: ubiquiteFolder, actorData: (pregen) => classicActorData(pregen, ubiquiteFolder.id, "ubiquite") },
    { pregens: DEEP_SPACE_GORE_PJ, folder: deepSpacePjFolder, actorData: (pregen) => classicActorData(pregen, deepSpacePjFolder.id, "deep-space-gore") },
    { pregens: DEEP_SPACE_GORE_ANTAGONISTS, folder: deepSpaceAntagonistFolder, actorData: (pregen) => classicActorData(pregen, deepSpaceAntagonistFolder.id, "deep-space-gore") },
    { pregens: AUCUN_ACCORD_PJ, folder: aucunAccordPjFolder, actorData: (pregen) => classicActorData(pregen, aucunAccordPjFolder.id, "aucun-accord") },
    { pregens: AUCUN_ACCORD_BRAQUEURS, folder: aucunAccordBraqueursFolder, actorData: (pregen) => classicActorData(pregen, aucunAccordBraqueursFolder.id, "aucun-accord") }
  ];

  let createdCount = 0;
  for (const group of groups) {
    const missing = group.pregens.filter((pregen) => !existingById.has(pregen.id));
    if (!missing.length) continue;
    await Actor.createDocuments(missing.map(group.actorData));
    createdCount += missing.length;
  }

  const existingHouse = HOUSE_PREGENS.filter((pregen) => existingById.has(pregen.id));
  await Promise.all(existingHouse.map((pregen) => existingById.get(pregen.id).update({
    folder: houseFolder.id,
    "system.scenarioId": "house",
    "system.positiveLink": pregen.positiveLink
  })));

  const updateAucunAccordActor = (pregen, folder) => existingById.get(pregen.id).update({
    name: pregen.name,
    folder: folder.id,
    "system.scenarioId": "aucun-accord",
    "system.profession": pregen.profession,
    "system.personality": pregen.personality,
    "system.advantage": pregen.advantage,
    "system.disadvantage": pregen.disadvantage,
    "system.background": pregen.background,
    "system.equipment": pregen.equipment ?? "",
    "system.secret": "",
    "system.secretKind": "",
    "system.gmNotes": "",
    ...(pregen.resources ? { "system.resources": pregen.resources } : {})
  });

  const existingAucunAccordPj = AUCUN_ACCORD_PJ.filter((pregen) => existingById.has(pregen.id));
  const existingAucunAccordBraqueurs = AUCUN_ACCORD_BRAQUEURS.filter((pregen) => existingById.has(pregen.id));
  await Promise.all([
    ...existingAucunAccordPj.map((pregen) => updateAucunAccordActor(pregen, aucunAccordPjFolder)),
    ...existingAucunAccordBraqueurs.map((pregen) => updateAucunAccordActor(pregen, aucunAccordBraqueursFolder))
  ]);

  if (createdCount) {
    ui.notifications.info(`${createdCount} acteur${createdCount > 1 ? "s" : ""} de scénario ajouté${createdCount > 1 ? "s" : ""}.`);
  }

  await game.settings.set(SYSTEM_ID, "pregensVersion", PREGENS_VERSION);
};
