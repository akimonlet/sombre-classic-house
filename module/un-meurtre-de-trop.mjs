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
    background: "Détective indépendante, vous classez vos preuves et vérifiez chaque détail. Vous connaissez la réputation de René et appréciez les résultats de Malik. Vous avez reçu l’invitation d’Octave pour votre travail d’enquêtrice.\n\nVous ouvrez les yeux. Quelque chose craque contre vos côtes. Votre torse est emballé dans plusieurs épaisseurs de film alimentaire, par-dessus vos vêtements. Le gros classeur rouge est plaqué contre votre poitrine. Vous êtes scotchée à une chaise de bureau. Vous portez une passoire sur la tête. Sur votre genou, de votre écriture : « COFFRE-FORT. FRAGILE. » Une ficelle relie votre chaise à la porte, en passant par une pyramide de cuillères. Derrière la porte, une voix très douce : « Madame Vidal ? Céleste Arnaud. Vous m’avez demandé de revenir avec une pièce d’identité et des ciseaux. J’ai les deux. »",
    equipment: "Classeur rouge ; film alimentaire ; passoire ; alarme de cuillères.",
    gmNotes: "Après avoir reçu les preuves d’Octave, Jeanne a décidé que son propre corps serait le coffre le plus sûr du manoir. Elle a testé plusieurs systèmes, puis s’est endormie pendant l’essai final. Le classeur contient les détournements de Céleste ; la copie reste sous le buvard d’Octave.\n\nCéleste veut récupérer le classeur. Elle propose de découper l’emballage et de ranger les documents pendant que Jeanne se débarbouille. Joue-la comme une professionnelle venue prendre en charge un incident de bureau particulièrement embarrassant. Jeanne a les mains libres : elle peut arracher le film, lire le classeur, bricoler son alarme ou négocier l’aide de Céleste.\n\nJeanne rejoint le petit déjeuner avec ce qu’elle a choisi de conserver. Céleste lui retire solennellement une dernière cuillère accrochée dans le dos : « Votre installation déborde. » Le sort du classeur dépend des décisions de Jeanne.\n\nDocument A3 : preuves des détournements de Céleste."
  },
  {
    id: "malik", name: "Malik Serra", profession: "Privé débrouillard", subfolder: PC_FOLDER,
    background: "Détective privé, vous retrouvez des gens et réglez leurs problèmes. Vous savez négocier et comprendre ce que chacun cherche à protéger. René vous a sorti d’un mauvais pas ; Jeanne a sauvé l’un de vos dossiers.\n\nVous vous réveillez sous la table de la cuisine. Votre poignet est menotté à un chariot de service. Sur le chariot : une caisse à pommes, une oie vivante et une pancarte « GARDE À VUE ». L’oie vous regarde. Vous la regardez. Elle arrache un morceau de la pancarte et le mange. Vous portez une toque, à laquelle quelqu’un a agrafé votre carte de détective. Victor entre avec un plateau. Il contemple l’installation. « Monsieur Serra. Bérénice souhaite porter plainte. » Il désigne l’oie. « Je vous avais demandé de la faire sortir de la cuisine. Vous avez ouvert une enquête. »",
    equipment: "Menottes reliées au chariot ; toque ; dictaphone ; feuille signée de nettoyage.",
    gmNotes: "Bérénice est une oie du domaine, entrée chercher des miettes pendant les préparatifs d’une omelette. Malik l’a arrêtée pour vol, a installé un poste de police dans la cuisine, puis s’est menotté au chariot pour assurer le transfert. Il avait récupéré son dictaphone dans la bibliothèque avant cette expédition.\n\nVictor veut récupérer sa cuisine et envoyer Bérénice dans la cour. Malik doit se libérer, gérer une oie qui défend son pain et répondre de son enquête nocturne. La clé des menottes est sous la corbeille à pain, au fond de la caisse. Son dictaphone est toujours dans sa poche. Victor peut l’aider dès qu’ils conviennent d’une façon de faire.\n\nMalik rejoint les autres avec son dictaphone et le plateau. Victor lui remet l’œuf sous scellé, posé dans une tasse : « Vous aviez demandé une cellule individuelle. »\n\nDocument A2 : Octave vivant après le jeu."
  },
  {
    id: "diane", name: "Diane Vasseur", profession: "Détective médiatique", subfolder: PC_FOLDER,
    background: "Détective connue de la presse, vous aimez provoquer des réactions et obtenir des confidences. René vous trouve théâtrale ; Jeanne vérifie vos intuitions. Octave vous a invitée pour ajouter du prestige à sa soirée.\n\nVous ouvrez les yeux sur la méridienne d’Agathe. Un rideau de dentelle vous sert de voile. Vous tenez un bouquet de poireaux noué d’un ruban. Sur le lit, à votre hauteur, un immense portrait d’homme à moustache porte un nœud papillon fixé au cadre. Deux coupes vides sont posées devant lui. Un carton décoré de cœurs annonce : « DIANE ET LE BARON — POUR TOUJOURS ». Agathe vous observe depuis une chaise. « Bonjour, mamie. Vous avez ma bague. » Elle désigne le portrait. « Mon arrière-grand-père. Vous avez insisté pour la suite nuptiale. »",
    equipment: "Voile en rideau ; bouquet de poireaux ; bague d’Agathe dans votre poche.",
    gmNotes: "Diane a expliqué qu’épouser un Delmas serait le moyen le plus rapide d’enquêter de l’intérieur. Agathe lui a présenté le portrait de son arrière-grand-père. La plaisanterie est devenue une cérémonie, avec bague empruntée et discours de Victor. Agathe a aussi confié son envie de partir. Elle cache l’argent pris à son père après le jeu.\n\nAgathe veut sa bague, qui se trouve dans la poche de Diane, et de l’aide pour remettre le portrait dans le couloir. Elle savoure la situation, tout en cherchant à savoir ce que Diane se rappelle de leurs confidences. La photo de la soirée repose sur la table de nuit. Laisse Diane découvrir les traces de sa cérémonie et décider comment traiter sa nouvelle famille.\n\nAgathe annonce le café. Avant de sortir, elle propose à Diane d’emporter le portrait : « Il prend peu de place à table. » Au petit déjeuner, Victor peut saluer Diane d’un impeccable « Madame la baronne ».\n\nDocument A4 : photo du bracelet de Céleste avant la fête."
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
    gmNotes: "Agathe a pris une enveloppe d’argent à son père après le jeu. Elle ment sur sa visite à la bibliothèque pour cacher ce vol. Elle y a vu Octave vivant et lui a parlé. L’enveloppe est dans sa valise.\n\nSur la défensive. Confrontée à son mensonge, elle avoue avoir pris l’argent et raconte sa conversation avec son père. Elle avait confié à Diane vouloir partir du manoir. Ses clés de voiture sont dans son manteau au dressing."
  },
  {
    id: "victor", name: "Victor Perrin", profession: "Majordome", subfolder: NPC_FOLDER,
    background: "Victor est le majordome d’Octave Delmas. D’une politesse sèche, il sert le café et répond aux questions des invités.",
    equipment: "Café et nécessaire de service.",
    gmNotes: "Victor jouait l’assassin pendant la soirée. Il connaît les accessoires, a vu Agathe avec son enveloppe et reconnaît le bracelet de Céleste.\n\nOctave avait invité les quatre détectives à résoudre son faux assassinat. Victor a simulé un coup avec un couteau rétractable et une poche de faux sang. Le faux testament le désignait comme assassin. Octave s’est ensuite relevé et a porté le toast final. Tout le monde a énormément bu.\n\nJouer les réveils dans l’ordre : René, Jeanne, Malik, Diane. Les derniers souvenirs précis des détectives remontent au premier toast. Le café les réunit en salle à manger. Victor va chercher Octave et découvre son corps dans la bibliothèque : « Monsieur Delmas est mort. Venez voir. » Il aide à préserver les preuves."
  }
];

const actorData = (character, folder) => {
  const image = `${ASSET_ROOT}/portraits/${character.id}.webp`;
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

let portraitsInProgress = false;
const applyPortraits = async () => {
  if (!game.user.isGM || portraitsInProgress) return;
  const activeGM = game.users?.activeGM;
  if (!activeGM || activeGM.id !== game.user.id) {
    ui.notifications.warn("Un meurtre de trop : utilisez le compte du MJ actif désigné pour appliquer les portraits.");
    return;
  }
  portraitsInProgress = true;
  try {
    const images = new Map();
    for (const actor of game.actors) {
      const id = actor.getFlag(SYSTEM_ID, "unMeurtreDeTropId");
      if (!CHARACTERS.some(character => character.id === id)) continue;
      const image = `${ASSET_ROOT}/portraits/${id}.webp`;
      images.set(actor.id, image);
      if (actor.img !== image || actor.prototypeToken.texture.src !== image) {
        await actor.update({ img: image, "prototypeToken.texture.src": image });
      }
    }
    for (const scene of game.scenes) {
      const updates = scene.tokens.filter(token => images.has(token.actorId)
        && token.texture.src !== images.get(token.actorId))
        .map(token => ({ _id: token.id, "texture.src": images.get(token.actorId) }));
      if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
    }
    ui.notifications.info("Un meurtre de trop : portraits appliqués aux fiches et aux pions des scènes.");
  } catch (error) {
    ui.notifications.error(`Un meurtre de trop : application des portraits interrompue (${error.message}). Relancez pour compléter les images manquantes.`);
  } finally {
    portraitsInProgress = false;
  }
};

let landingInProgress = false;
const createLanding = async () => {
  if (!game.user.isGM || landingInProgress) return;
  const activeGM = game.users?.activeGM;
  if (!activeGM || activeGM.id !== game.user.id) {
    ui.notifications.warn("Un meurtre de trop : utilisez le compte du MJ actif désigné pour créer la scène d’accueil.");
    return;
  }
  landingInProgress = true;
  try {
    const existing = game.scenes.find(scene => scene.getFlag(SYSTEM_ID, "unMeurtreDeTropLanding") === true);
    if (existing) {
      ui.notifications.info("Un meurtre de trop : scène d’accueil existante conservée.");
      return existing;
    }
    const scene = await Scene.create({
      name: "Un meurtre de trop",
      background: { src: `${ASSET_ROOT}/landing-un-meurtre-de-trop.webp` },
      width: 1920, height: 1080, padding: 0, grid: { type: 0 },
      tokenVision: false, fog: { exploration: false }, navigation: true, active: false,
      tokens: [], flags: { [SYSTEM_ID]: { unMeurtreDeTropLanding: true } }
    });
    ui.notifications.info("Un meurtre de trop : scène d’accueil créée, sans activation automatique.");
    return scene;
  } catch (error) {
    ui.notifications.error(`Un meurtre de trop : création de la scène d’accueil interrompue (${error.message}). Vous pouvez réessayer.`);
  } finally {
    landingInProgress = false;
  }
};

const confirmCreation = () => {
  if (!game.user.isGM) return;
  new Dialog({
    title: "Un meurtre de trop",
    content: [
      "<p>Ajouter les fiches manquantes dans <strong>Scénarios personnalisés / Un meurtre de trop</strong>.</p>",
      "<p><strong>4 PJ et 3 PNJ</strong>. Le MJ attribue les fiches aux joueurs. Les fiches existantes conservent toutes leurs données et permissions.</p>",
      "<p>Les nouvelles fiches utilisent les portraits. Les choix de personnalité et de traits restent disponibles.</p>",
      "<p><strong>Appliquer les portraits</strong> remplace uniquement les images des fiches de ce scénario, de leurs pions prototypes et de leurs pions dans les scènes. Les autres données et permissions restent inchangées.</p>",
      "<p><strong>Créer la scène d’accueil</strong> ajoute un fond sans révélations ni pions, sans activation automatique. Une scène d’accueil existante est conservée.</p>",
      `<p>Portraits : ${CHARACTERS.map(character => `<a href="${ASSET_ROOT}/portraits/${character.id}.webp" target="_blank" rel="noopener">${character.name}</a>`).join(" · ")}</p>`,
      `<p><a href="${ASSET_ROOT}/landing-un-meurtre-de-trop.html" target="_blank" rel="noopener">Page d’accueil joueurs</a> · `,
      `<a href="${ASSET_ROOT}/landing-un-meurtre-de-trop.webp" target="_blank" rel="noopener">Image d’accueil</a></p>`,
      `<p><a href="${ASSET_ROOT}/conducteur-un-meurtre-de-trop.html" target="_blank" rel="noopener">Conducteur MJ</a> · `,
      `<a href="${ASSET_ROOT}/plan-joueurs-un-meurtre-de-trop.html" target="_blank" rel="noopener">Plan joueurs</a></p>`
    ].join(""),
    buttons: {
      create: { icon: '<i class="fa-solid fa-user-plus"></i>', label: "Créer les fiches manquantes", callback: createCharacters },
      portraits: { icon: '<i class="fa-solid fa-image"></i>', label: "Appliquer les portraits", callback: applyPortraits },
      landing: { icon: '<i class="fa-solid fa-house"></i>', label: "Créer la scène d’accueil", callback: createLanding },
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
    const button = $('<button type="button" data-create-un-meurtre-de-trop title="Fiches, portraits et accueil de Un meurtre de trop"><i class="fa-solid fa-magnifying-glass"></i> Un meurtre de trop</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
