const SYSTEM_ID = "sombre-classic-house";
const PREGENS_VERSION = "2";
const FOLDER_NAME = "Prétirés — House";

const PREGENS = [
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

const actorData = (pregen, folderId) => ({
  name: pregen.name,
  type: "victime",
  img: "icons/svg/mystery-man.svg",
  folder: folderId,
  flags: {
    [SYSTEM_ID]: {
      pregenId: pregen.id
    }
  },
  system: {
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
    traitsRandomUsed: true,
    traitsRandomLocked: true,
    adrenalinePending: false,
    background: pregen.background,
    equipment: ""
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

  let folder = game.folders.find((entry) => entry.type === "Actor" && entry.name === FOLDER_NAME);
  if (!folder) {
    folder = await Folder.create({
      name: FOLDER_NAME,
      type: "Actor"
    });
  }

  const existingById = new Map(
    game.actors
      .map((actor) => [actor.getFlag(SYSTEM_ID, "pregenId"), actor])
      .filter(([id]) => Boolean(id))
  );
  const missing = PREGENS.filter((pregen) => !existingById.has(pregen.id));

  if (missing.length) {
    await Actor.createDocuments(missing.map((pregen) => actorData(pregen, folder.id)));
    ui.notifications.info(`${missing.length} prétiré${missing.length > 1 ? "s" : ""} ajouté${missing.length > 1 ? "s" : ""} dans « ${FOLDER_NAME} ».`);
  }

  const existing = PREGENS.filter((pregen) => existingById.has(pregen.id));
  if (existing.length) {
    await Promise.all(existing.map((pregen) => (
      existingById.get(pregen.id).update({ "system.positiveLink": pregen.positiveLink })
    )));
  }

  await game.settings.set(SYSTEM_ID, "pregensVersion", PREGENS_VERSION);
};
