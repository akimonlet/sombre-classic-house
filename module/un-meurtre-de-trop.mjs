const SYSTEM_ID = "sombre-classic-house";
const ASSET_ROOT = "systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop";
const PC_FOLDER = "1. Personnages Joueurs";
const NPC_FOLDER = "2. Personnages Non-Joueurs";

// Source: scenario-court.js and interface-courte.html, Un meurtre de trop.
// Public openings retain the initial confusion. Truth and evidence stay in gmNotes.
const CHARACTERS = [
  {
    id: "rene", name: "René Valmont", profession: "Ancien policier autoritaire", subfolder: PC_FOLDER,
    background: "Ancien enquêteur de la police judiciaire, vous travaillez maintenant comme consultant. Vous connaissez tout le monde et aimez diriger. Jeanne conteste volontiers vos conclusions ; Malik vous doit un service.\n\nVous vous réveillez dans une baignoire vide, vêtu d’un pantalon trop court. Votre chaussure repose sous une cloche à fromage. Victor, le majordome, frappe : « Monsieur Valmont ? Je vous rapporte votre pantalon. J’aimerais récupérer le mien. »",
    equipment: "Pantalon trop court ; chaussure sous une cloche à fromage.",
    gmNotes: "René avait renversé du vin sur ses vêtements. Victor lui a prêté un pantalon.\n\nVictor attend des excuses : René l’a attaché avec une cravate pour l’interroger pendant le jeu. En échangeant les pantalons, il explique qu’Octave lui avait donné le rôle de l’assassin. Le livret est au salon. Il invite ensuite René à prendre un café. Document A1 : le livret du jeu."
  },
  {
    id: "jeanne", name: "Jeanne Vidal", profession: "Détective méthodique", subfolder: PC_FOLDER,
    background: "Détective indépendante, vous classez vos preuves et vérifiez chaque détail. Vous connaissez la réputation de René et appréciez les résultats de Malik. Vous avez reçu l’invitation d’Octave pour votre travail d’enquêtrice.\n\nVous vous réveillez sur un canapé, un gros classeur rouge serré contre vous. Une chaise bloque la porte. Un billet de votre main indique : « À GARDER POUR OCTAVE. » Céleste, la secrétaire, vous appelle depuis le palier : « Madame Vidal ? Je viens récupérer les documents de Monsieur Delmas. »",
    equipment: "Classeur rouge fermé ; billet manuscrit « À GARDER POUR OCTAVE. ».",
    gmNotes: "Octave a confié à Jeanne les preuves des détournements de Céleste. Une copie reste sous son buvard, dans la bibliothèque.\n\nCéleste veut le classeur. Elle le présente comme un accessoire de la soirée et demande si Jeanne l’a lu. Jeanne peut l’ouvrir, le garder ou le lui remettre. Si Céleste l’obtient, elle cherche à rejoindre la cheminée du salon pour brûler les feuilles. Document A3 : factures signées, paiements à CA Services et lettre annonçant la dénonciation à la gendarmerie."
  },
  {
    id: "malik", name: "Malik Serra", profession: "Privé débrouillard", subfolder: PC_FOLDER,
    background: "Détective privé, vous retrouvez des gens et réglez leurs problèmes. Vous savez négocier et comprendre ce que chacun cherche à protéger. René vous a sorti d’un mauvais pas ; Jeanne a sauvé l’un de vos dossiers.\n\nVous ouvrez un œil sur une montagne de vaisselle. Vous avez une toque sur la tête. Victor entre et pose une feuille signée devant vous : « Je nettoie tout demain. » Il vous tend une éponge. « Nous sommes demain. »",
    equipment: "Toque ; feuille signée « Je nettoie tout demain. » ; éponge tendue par Victor.",
    gmNotes: "Malik a préparé une omelette désastreuse. Sa manche est tachée de sauce tomate. Le dictaphone a enregistré Octave vivant après le jeu.\n\nVictor réclame un coup de main pour servir le café. En discutant, il raconte avoir vu Agathe quitter la bibliothèque avec une enveloppe. Malik retrouve son dictaphone dans sa poche : il l’avait laissé sur le guéridon de la bibliothèque, puis repris avant de dormir. Document A2 : Octave demande à Victor de ranger son couteau de théâtre, puis parle à Agathe."
  },
  {
    id: "diane", name: "Diane Vasseur", profession: "Détective médiatique", subfolder: PC_FOLDER,
    background: "Détective connue de la presse, vous aimez provoquer des réactions et obtenir des confidences. René vous trouve théâtrale ; Jeanne vérifie vos intuitions. Octave vous a invitée pour ajouter du prestige à sa soirée.\n\nVous vous réveillez sur une méridienne dans la chambre d’Agathe Delmas. Elle attend devant vous, la main tendue. « Ma bague. Elle est dans votre poche. Vous aviez promis de me la rendre après votre reconstitution. » Une photo de la soirée repose sur la table de nuit.",
    equipment: "Bague réclamée par Agathe dans votre poche ; photo de la soirée sur la table de nuit.",
    gmNotes: "Agathe a pris de l’argent à son père après le jeu et cherche à le dissimuler. Elle lui a parlé à ce moment-là.\n\nAgathe réclame sa bague, cachée pendant un jeu improvisé. Elle cherche à savoir ce que Diane se rappelle de leur conversation. Elle lui avait confié vouloir partir du manoir. Si Diane s’intéresse à la photo, elle peut examiner le bracelet de Céleste. Document A4 : bracelet doré entier, maillons rectangulaires gravés de soleils."
  },
  {
    id: "celeste", name: "Céleste Arnaud", profession: "Secrétaire d’Octave", subfolder: NPC_FOLDER,
    background: "Céleste est la secrétaire d’Octave Delmas. Calme et serviable, elle appelle Jeanne depuis le palier pour récupérer les documents de Monsieur Delmas.",
    equipment: "",
    gmNotes: "Céleste détournait l’argent d’Octave. Il allait la dénoncer au matin et avait confié les preuves à Jeanne. Après le jeu, Céleste a rejoint Octave dans la bibliothèque et l’a poignardé avec son coupe-papier. Il lui a arraché un maillon de bracelet. Elle a laissé le corps dans le fauteuil utilisé pour le jeu. Son bracelet cassé est dans sa poche.\n\nElle veut récupérer le classeur et brûler les preuves dans la cheminée du salon. Elle attend une occasion de le prendre, puis cherche à partir si elle se sent découverte, par l’entrée principale ou la porte de la cuisine. Si les détectives la retiennent, elle négocie puis se rend.\n\nA3 : les factures et la lettre prouvent les détournements ; copie sous le buvard d’Octave. A4 : la photo montre le bracelet entier avant la fête. A5 : le maillon doré rectangulaire gravé d’un soleil, retenu par la main d’Octave, s’ajuste au bracelet cassé. Victor reconnaît le bijou. A6 : le billet déchiré dans la corbeille indique les originaux chez Jeanne et la copie sous le buvard."
  },
  {
    id: "agathe", name: "Agathe Delmas", profession: "Fille d’Octave", subfolder: NPC_FOLDER,
    background: "Agathe est la fille d’Octave Delmas. Elle attend Diane dans sa chambre et lui réclame sa bague.",
    equipment: "",
    gmNotes: "Agathe a pris une enveloppe d’argent à son père après le jeu. Elle ment sur sa visite à la bibliothèque pour cacher ce vol. Elle y a vu Octave vivant et lui a parlé. L’enveloppe est dans son sac.\n\nSur la défensive. Confrontée à son mensonge, elle avoue avoir pris l’argent et raconte sa conversation avec son père. Elle avait confié à Diane vouloir partir du manoir. Ses clés de voiture sont dans son manteau au dressing."
  },
  {
    id: "victor", name: "Victor Perrin", profession: "Majordome", subfolder: NPC_FOLDER,
    background: "Victor est le majordome d’Octave Delmas. D’une politesse sèche, il sert le café et répond aux questions des invités.",
    equipment: "Café et nécessaire de service.",
    gmNotes: "Victor jouait l’assassin pendant la soirée. Il connaît les accessoires, a vu Agathe avec son enveloppe et reconnaît le bracelet de Céleste.\n\nOctave avait invité les quatre détectives à résoudre son faux assassinat. Victor a simulé un coup avec un couteau rétractable et une poche de faux sang. Le faux testament le désignait comme assassin. Octave s’est ensuite relevé et a porté le toast final. Tout le monde a énormément bu.\n\nJouer les réveils dans l’ordre : René, Jeanne, Malik, Diane. Les derniers souvenirs précis des détectives remontent au premier toast. Le café les réunit en salle à manger. Victor va chercher Octave et découvre son corps dans la bibliothèque : « Monsieur Delmas est mort. Venez voir. » Il aide à préserver les preuves."
  }
];

const actorData = (character, folder) => {
  const image = `${ASSET_ROOT}/tokens/${character.id}.svg`;
  return {
    name: character.name, type: "victime", folder, img: image,
    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
    flags: { [SYSTEM_ID]: { unMeurtreDeTropId: character.id } },
    prototypeToken: {
      name: character.name, actorLink: true,
      texture: { src: image }, displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
    },
    system: {
      scenarioId: "un-meurtre-de-trop", isAntagonist: false, playerName: "",
      profession: character.profession, nameRandomLocked: true, professionRandomLocked: true,
      positiveLink: "", specialCard: "", personality: 0,
      personalityRandomUsed: false, personalityRandomLocked: false,
      advantage: "", advantageDescription: "", disadvantage: "", disadvantageDescription: "",
      advantageRandomUsed: false, advantageRandomLocked: false,
      disadvantageRandomUsed: false, disadvantageRandomLocked: false,
      traitsRandomUsed: false, traitsRandomLocked: false,
      adrenalinePending: false,
      resources: {
        body: { value: 12, max: 12 }, spirit: { value: 12, max: 12 }, adrenaline: { value: 0, max: 3 }
      },
      background: character.background, equipment: character.equipment,
      secret: "", secretKind: "", specialUsed: false, infected: false, gmNotes: character.gmNotes
    }
  };
};

const ensureActorFolder = async (name, parentId = null) => {
  const existing = game.folders.find(folder => folder.type === "Actor" && folder.name === name
    && (folder.folder?.id ?? folder.folder ?? null) === parentId);
  return existing ?? Folder.create({ name, type: "Actor", folder: parentId });
};

// Shared by every directory render and dialog in this client session.
let creationInProgress = false;
const createCharacters = async () => {
  if (!game.user.isGM || creationInProgress) return;
  const activeGM = game.users?.activeGM;
  if (!activeGM || activeGM.id !== game.user.id) {
    ui.notifications.warn("Un meurtre de trop : utilisez le compte du MJ actif désigné pour créer les fiches.");
    return;
  }
  creationInProgress = true;
  try {
    const root = await ensureActorFolder("Scénarios personnalisés");
    const scenario = await ensureActorFolder("Un meurtre de trop", root.id);
    const pcs = await ensureActorFolder(PC_FOLDER, scenario.id);
    const npcs = await ensureActorFolder(NPC_FOLDER, scenario.id);
    const existingIds = new Set(game.actors.map(actor => actor.getFlag(SYSTEM_ID, "unMeurtreDeTropId")));
    const missing = CHARACTERS.filter(character => !existingIds.has(character.id));
    if (missing.length) {
      await Actor.createDocuments(missing.map(character => actorData(character, character.subfolder === PC_FOLDER ? pcs.id : npcs.id)));
    }
    ui.notifications.info(missing.length
      ? `${missing.length} fiches créées dans Un meurtre de trop. Les fiches existantes sont conservées.`
      : "Les 7 fiches de Un meurtre de trop sont conservées.");
  } catch (error) {
    ui.notifications.error(`Un meurtre de trop : création interrompue (${error.message}). Relancez pour compléter les fiches manquantes.`);
  } finally {
    creationInProgress = false;
  }
};

const confirmCreation = () => {
  if (!game.user.isGM) return;
  new Dialog({
    title: "Créer les fiches — Un meurtre de trop",
    content: [
      "<p>Ajouter les fiches manquantes dans <strong>Scénarios personnalisés / Un meurtre de trop</strong>.</p>",
      "<p><strong>4 PJ et 3 PNJ</strong>. Le MJ attribue les fiches aux joueurs. Les fiches existantes conservent toutes leurs données et permissions.</p>",
      "<p>Les pions portent les initiales des personnages. Les choix de personnalité et de traits restent disponibles.</p>",
      `<p><a href="${ASSET_ROOT}/conducteur-un-meurtre-de-trop.html" target="_blank" rel="noopener">Conducteur MJ</a> · `,
      `<a href="${ASSET_ROOT}/plan-joueurs-un-meurtre-de-trop.html" target="_blank" rel="noopener">Plan joueurs</a></p>`
    ].join(""),
    buttons: {
      create: { icon: '<i class="fa-solid fa-user-plus"></i>', label: "Créer les fiches manquantes", callback: createCharacters },
      cancel: { icon: '<i class="fa-solid fa-xmark"></i>', label: "Annuler" }
    },
    default: "cancel"
  }).render(true);
};

export const registerUnMeurtreDeTropGenerator = () => {
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-un-meurtre-de-trop]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-un-meurtre-de-trop title="Créer les fiches de Un meurtre de trop"><i class="fa-solid fa-magnifying-glass"></i> Un meurtre de trop</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
