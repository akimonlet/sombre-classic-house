const SYSTEM_ID = "sombre-classic-house";
const ASSET_ROOT = "systems/sombre-classic-house/assets/scenarios/les-jours-heureux";
const PC_FOLDER = "1. Personnages Joueurs";
// Source: Les jours heureux / scenario-data.json, cast-stats.json and conductor.
// Public biographies are imposed claims, not remembered facts. Keep the real
// identities, individual openings and memory fragments exclusively in gmNotes.
const CHARACTERS = [
  {
    "id": "rene",
    "name": "René Vautrin",
    "body": 7,
    "spirit": 5,
    "background": "Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\nVous vous appelez René Vautrin. Vous êtes un ancien représentant en aspirateurs, marié et père d’une fille. Après votre licenciement, vous auriez commencé à vous prendre pour un policier. Vous auriez interrogé vos voisins, installé un « bureau des plaintes » dans votre cuisine et arrêté votre beau-frère pour le vol de votre tondeuse. Votre femme aurait demandé votre admission après cet incident.\n\nVous remarquez immédiatement lorsqu’on évite de répondre à une question.",
    "gmNotes": "IDENTITÉ RÉELLE — MJ\nRené Marchand · Détective privé · ancien inspecteur\nRené dirige la petite équipe engagée par les familles. Patient et sociable, il obtient davantage avec une conversation qu’avec des menaces. Il note les formulations exactes : c’est souvent là que les mensonges se contredisent. Il est venu à l’asile sous son véritable nom pour demander à rencontrer plusieurs pensionnaires. Le directeur l’a reçu avec une courtoisie impeccable.\n\nRÉVEIL INDIVIDUEL — À LIRE\nVous ouvrez les yeux sur un plafond blanc taché d’humidité. Dans la porte fermée, un petit volet vitré donne sur un couloir ; vous ignorez votre nom et comment vous êtes arrivé ici. Une femme en uniforme ouvre la porte, un gobelet d’eau et une coupelle à la main.\n\nMOREAU\nBonjour, René. Comment vous sentez-vous aujourd’hui ? Vous savez où vous êtes ? Voici vos médicaments ; ensuite, nous irons à la récréation.\nElle insiste : « Vous n’avez aucune enquête en cours. Votre femme souhaite simplement que vous vous reposiez. »\nMoreau demande comment le patient se sent, écoute sa réponse et propose la récréation. Elle croit la biographie imposée. Toute demande de preuve familiale ou administrative est renvoyée au directeur ; elle ne possède pas de document donnant sa vraie identité.\n\nFLASHBACKS DIFFICILES ET INCOMPLETS — MJ\nRelève une contradiction : un interrogatoire, une cigarette écrasée, une voix qui répète « reprenez depuis le début ». Plus tard, une photo de Paul lui rend le souvenir de sa sœur venue demander de l’aide."
  },
  {
    "id": "madeleine",
    "name": "Madeleine Aubry",
    "body": 5,
    "spirit": 7,
    "background": "Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\nVous vous appelez Madeleine Aubry. Vous êtes photographe de mariages, célibataire. Vous auriez développé la conviction que certaines personnes sont remplacées par des sosies. Lors d’un mariage, vous auriez enfermé le marié dans un placard et annoncé à toute la réception que « le vrai avait une autre oreille ». Votre frère aurait organisé votre placement dans la clinique.\n\nVous regardez spontanément les visages, les fenêtres et les reflets.",
    "gmNotes": "IDENTITÉ RÉELLE — MJ\nMadeleine Perrin · Enquêtrice · filatures et photographie\nMadeleine sait observer sans attirer l’attention et se souvenir d’un visage, d’une porte ou d’un trajet. Elle a de l’humour, peu de patience pour les grands discours et l’habitude de chercher une autre entrée quand on lui ferme la première. Avant leur visite officielle, elle avait photographié les véhicules qui entraient dans la clinique et ceux qui en sortaient.\n\nRÉVEIL INDIVIDUEL — À LIRE\nLe jour traverse un vitrage armé, trop haut pour voir le jardin depuis le lit. Un petit miroir de métal déforme votre reflet au-dessus du lavabo ; ce visage ne vous rappelle rien. Une clé tourne et une femme en uniforme entre avec de l’eau et une coupelle.\n\nMOREAU\nBonjour, Madeleine. Comment vous sentez-vous aujourd’hui ? Vous savez où vous êtes ? Voici vos médicaments ; ensuite, nous irons à la récréation.\nElle insiste : « Si un visage vous paraît étrange, vous nous le dites. Vous ne suivez personne et vous ne fouillez pas ses affaires. »\nMoreau demande comment le patient se sent, écoute sa réponse et propose la récréation. Elle croit la biographie imposée. Toute demande de preuve familiale ou administrative est renvoyée au directeur ; elle ne possède pas de document donnant sa vraie identité.\n\nFLASHBACKS DIFFICILES ET INCOMPLETS — MJ\nSuit un reflet ou surveille une porte : le viseur d’un appareil, une attente dans une voiture, l’entrée de la clinique observée depuis la route. Plus tard, une note sur des véhicules qui ne sont jamais venus."
  },
  {
    "id": "lucien",
    "name": "Lucien Morel",
    "body": 8,
    "spirit": 4,
    "background": "Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\nVous vous appelez Lucien Morel. Vous êtes horloger, veuf et sans enfant. Vous auriez pris l’habitude de sortir la nuit et de démonter les serrures des habitants de votre immeuble pour « vérifier qu’ils pourraient sortir en cas d’incendie ». Vous auriez finalement retiré la porte d’entrée du commissariat. Vous auriez vous-même demandé à être hospitalisé, avant de l’oublier.\n\nLe mécanisme de la porte vous paraît compréhensible, même si vous ignorez pourquoi.",
    "gmNotes": "IDENTITÉ RÉELLE — MJ\nLucien Bernard · Enquêteur de terrain · ancien serrurier\nLucien s’occupe des vérifications matérielles : accès, serrures, distances et horaires. Peu bavard, débrouillard, il déteste abîmer ce qu’il peut démonter proprement. Il a toujours quelque chose dans les poches pour réparer une petite panne. Il avait accompagné René en se faisant passer pour son assistant. Pendant la visite, il avait surtout regardé les portes.\n\nRÉVEIL INDIVIDUEL — À LIRE\nVous êtes couché dans une petite chambre nue, en chemise de coton. La porte porte une serrure épaisse côté couloir ; un lit, une chaise et un lavabo occupent presque tout l’espace. La serrure claque et une femme en uniforme entre, portant une coupelle et un gobelet d’eau.\n\nMOREAU\nBonjour, Lucien. Comment vous sentez-vous aujourd’hui ? Vous savez où vous êtes ? Voici vos médicaments ; ensuite, nous irons à la récréation.\nElle insiste : « Vous nous avez demandé de vous empêcher de sortir. Même si vous changez d’avis, nous devons tenir notre promesse. »\nMoreau demande comment le patient se sent, écoute sa réponse et propose la récréation. Elle croit la biographie imposée. Toute demande de preuve familiale ou administrative est renvoyée au directeur ; elle ne possède pas de document donnant sa vraie identité.\n\nFLASHBACKS DIFFICILES ET INCOMPLETS — MJ\nExamine une serrure ou protège quelqu’un : un outil dans sa main, René derrière son épaule, puis une odeur d’eau stagnante et un escalier. Il peut reconnaître une sortie avant de comprendre pourquoi."
  },
  {
    "id": "suzanne",
    "name": "Suzanne Mercier",
    "body": 4,
    "spirit": 8,
    "background": "Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\nVous vous appelez Suzanne Mercier. Vous êtes comptable, divorcée et sans enfant. Vous auriez entrepris de refaire tous vos papiers sous des identités prestigieuses. Vous vous seriez successivement déclarée propriétaire de votre immeuble, inspectrice des impôts et héritière d’une principauté qui n’existe pas. Vous auriez tenté de licencier votre propre patron au moyen d’un courrier portant sa signature.\n\nVous examinez machinalement les dates, les noms et les signatures.",
    "gmNotes": "IDENTITÉ RÉELLE — MJ\nSuzanne Delcourt · Enquêtrice · dossiers administratifs\nAncienne secrétaire juridique, Suzanne sait retrouver une personne derrière un changement de nom, suivre une facture et repérer une signature imitée. Elle est polie, précise et difficile à impressionner. Elle aide l’équipe à vérifier les dates d’admission et les autorisations signées par les familles. Sa présence apporte une compétence supplémentaire ; aucun renseignement essentiel ne dépend d’elle.\n\nRÉVEIL INDIVIDUEL — À LIRE\nUne couverture rêche vous gratte le cou. Il n’y a aucun vêtement personnel dans la chambre, seulement des chaussons et une chemise de coton ; vous ne savez même pas quel nom réclamer. Une femme ouvre la porte avec un plateau, consulte une fiche et vous sourit.\n\nMOREAU\nBonjour, Suzanne. Comment vous sentez-vous aujourd’hui ? Vous savez où vous êtes ? Voici vos médicaments ; ensuite, nous irons à la récréation.\nElle insiste : « Les documents que vous pourriez retrouver ne prouvent rien, Suzanne. Vous êtes très douée pour les fabriquer. »\nMoreau demande comment le patient se sent, écoute sa réponse et propose la récréation. Elle croit la biographie imposée. Toute demande de preuve familiale ou administrative est renvoyée au directeur ; elle ne possède pas de document donnant sa vraie identité.\n\nFLASHBACKS DIFFICILES ET INCOMPLETS — MJ\nRapproche deux documents ou deux récits : une faute de frappe répétée, des photographies sur un bureau, sa propre main soulignant une adresse. Plus tard seulement, le souvenir de faux transferts."
  }
];
const CHARACTER_IDS = CHARACTERS.map(character => character.id);
const SHARED_GM_NOTES = [
  "CHRONOLOGIE — MJ : Les vrais détectives ont été capturés plusieurs jours auparavant. Les réveils, visites de Moreau et récréations se répètent. Aucun souvenir isolé ne restitue leur biographie ; croiser fragments et indices. Les symptômes allégués n’imposent aucune conduite.",
  "DÉPART : Tous portent une chemise de coton et des chaussons. Aucun papier réel ni outil au départ ; les vêtements en lingerie ont été vidés. Les vraies identités et pièces à conviction sont enfermées dans le bureau du directeur, pas accessibles automatiquement.",
  "RUPTURE : Les chambres sont déverrouillées. Les pensionnaires encore présents à la récréation sont morts. Moreau a ouvert les chambres pour sauver les PJ avant de mourir dans l’infirmerie ; son trousseau est dans le couloir.",
  "MENACE : La Patiente circule, imite les voix et chasse au bruit. Elle emporte ses victimes vers le sous-sol. Delmas se cache au local des pompes dans l’espoir de ressusciter sa femme. Les transferts administratifs sont faux ; aucun véhicule ne vient assurer un transfert régulier.",
  "À TROIS JOUEURS : Suzanne reste optionnelle ; aucun indice essentiel ni voie de sortie ne dépend d’elle. Une fiche déjà préparée n’impose pas sa présence dans la fiction."
].join("\n\n");

const actorData = (character, folder) => ({
  name: character.name, type: "victime", folder, img: `${ASSET_ROOT}/portraits/${character.id}.webp`,
  ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
  flags: { [SYSTEM_ID]: { lesJoursHeureuxId: character.id } },
  prototypeToken: {
    name: character.name, actorLink: true,
    texture: { src: `${ASSET_ROOT}/portraits/${character.id}.webp` },
    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
  },
  system: {
    scenarioId: "les-jours-heureux", isAntagonist: false, playerName: "",
    profession: "Patient amnésique", nameRandomLocked: true, professionRandomLocked: true,
    positiveLink: "", specialCard: "", personality: 0,
    personalityRandomUsed: false, personalityRandomLocked: false,
    advantage: "", advantageDescription: "", disadvantage: "", disadvantageDescription: "",
    advantageRandomUsed: false, advantageRandomLocked: false,
    disadvantageRandomUsed: false, disadvantageRandomLocked: false,
    traitsRandomUsed: false, traitsRandomLocked: false,
    adrenalinePending: false,
    resources: {
      body: { value: character.body, max: 12 }, spirit: { value: character.spirit, max: 12 },
      adrenaline: { value: 0, max: 3 }
    },
    background: character.background, equipment: "Chemise de coton et chaussons de l’hôpital.",
    secret: "", secretKind: "", specialUsed: false, infected: false,
    gmNotes: `${character.gmNotes}\n\n${SHARED_GM_NOTES}`
  }
});

const ensureActorFolder = async (name, parentId = null) => {
  const existing = game.folders.find(folder => folder.type === "Actor" && folder.name === name
    && (folder.folder?.id ?? folder.folder ?? null) === parentId);
  if (existing) return existing;
  requireActiveGM();
  return Folder.create({ name, type: "Actor", folder: parentId });
};

// Foundry V12 designates a single active GM across clients. The local guard
// also serializes separate dialogs and the creation/portrait actions together.
let operationInProgress = false;
const isActiveGM = () => game.user.isGM && Boolean(game.users?.activeGM)
  && game.users.activeGM.id === game.user.id;
const requireActiveGM = () => {
  if (!isActiveGM()) throw new Error("le MJ actif ou les permissions ont changé ; utilisez le compte du MJ actif désigné");
};
const runAsActiveGM = async (operation) => {
  if (!game.user.isGM || operationInProgress) return;
  if (!isActiveGM()) {
    ui.notifications.warn("Les jours heureux : utilisez le compte du MJ actif désigné pour modifier le scénario.");
    return;
  }
  operationInProgress = true;
  try {
    await operation();
  } catch (error) {
    ui.notifications.error(`Les jours heureux : opération interrompue (${error.message}). Relancez pour compléter les fiches ou les images manquantes.`);
  } finally {
    operationInProgress = false;
  }
};

const createCharacters = async (html) => runAsActiveGM(async () => {
  const includeSuzanne = html?.find('[name="includeSuzanne"]').prop("checked") ?? true;
  const existingIds = new Set(game.actors.map(actor => actor.getFlag(SYSTEM_ID, "lesJoursHeureuxId")));
  const missing = CHARACTERS.filter(character => (includeSuzanne || character.id !== "suzanne") && !existingIds.has(character.id));
  if (missing.length) {
    const root = await ensureActorFolder("Scénarios personnalisés");
    const scenario = await ensureActorFolder("Les jours heureux", root.id);
    const pcs = await ensureActorFolder(PC_FOLDER, scenario.id);
    requireActiveGM();
    await Actor.createDocuments(missing.map(character => actorData(character, pcs.id)));
  }
  ui.notifications.info(missing.length
    ? `${missing.length} fiches créées dans Les jours heureux. Les fiches existantes sont conservées.`
    : "Les jours heureux : les fiches sélectionnées existent déjà et sont conservées.");
});

const createMonster = async () => runAsActiveGM(async () => {
  if (game.actors.some(actor => actor.getFlag(SYSTEM_ID, "lesJoursHeureuxId") === "patiente")) {
    ui.notifications.info("La Patiente existe déjà : sa fiche et ses valeurs sont conservées.");
    return;
  }
  const root = await ensureActorFolder("Scénarios personnalisés");
  const scenario = await ensureActorFolder("Les jours heureux", root.id);
  const folder = await ensureActorFolder("2. Antagonistes", scenario.id);
  const data = actorData({
    id: "patiente", name: "La Patiente", body: 12, spirit: 12,
    background: "Une silhouette féminine démesurée, aux cheveux trempés, vêtue d’une chemise d’hôpital.",
    gmNotes: "Réglage maison de départ, modifiable : Corps 12/12, Esprit 12/12. Utiliser les boutons Corps, Esprit et Attaque de la fiche. L’Adrénaline est désactivée en mode Antagoniste.\n\nElle suit les bruits et imite les voix réellement entendues. Les verrous et barricades la retardent ; annoncer ses pas ou une poignée avant son approche. Elle cherche à saisir et emporter au bassin : laisser une possibilité de diversion ou de sauvetage, sans mort automatique."
  }, folder.id);
  data.img = `${ASSET_ROOT}/creatures/patiente.webp`;
  data.prototypeToken.texture.src = `${ASSET_ROOT}/creatures/patiente-token.webp`;
  data.prototypeToken.disposition = -1;
  data.prototypeToken.displayName = 0;
  data.system.isAntagonist = true;
  data.system.profession = "Créature du bassin";
  data.system.equipment = "";
  requireActiveGM();
  await Actor.createDocuments([data]);
  ui.notifications.info("La Patiente créée dans Les jours heureux / 2. Antagonistes. Glissez sa fiche sur la scène pour placer son token.");
});

const applyPortraits = async () => runAsActiveGM(async () => {
  const images = new Map();
  for (const actor of game.actors) {
    const id = actor.getFlag(SYSTEM_ID, "lesJoursHeureuxId");
    if (!CHARACTER_IDS.includes(id)) continue;
    const image = `${ASSET_ROOT}/portraits/${id}.webp`;
    images.set(actor.id, image);
    if (actor.img !== image || actor.prototypeToken?.texture?.src !== image) {
      requireActiveGM();
      await actor.update({ img: image, "prototypeToken.texture.src": image });
    }
  }
  for (const scene of game.scenes) {
    const updates = scene.tokens.filter(token => images.has(token.actorId)
      && token.texture?.src !== images.get(token.actorId))
      .map(token => ({ _id: token.id, "texture.src": images.get(token.actorId) }));
    if (updates.length) {
      requireActiveGM();
      await scene.updateEmbeddedDocuments("Token", updates);
    }
  }
  ui.notifications.info("Les jours heureux : portraits appliqués aux fiches et aux pions des scènes.");
});

const confirmCreation = () => {
  if (!game.user.isGM) return;
  new Dialog({
    title: "Les jours heureux",
    content: [
      "<p>Ajouter les fiches manquantes dans <strong>Scénarios personnalisés / Les jours heureux</strong>.</p>",
      '<p><label><input type="checkbox" name="includeSuzanne" checked> Inclure Suzanne, 4e PJ optionnel</label></p>',
      "<p>Trois PJ ou quatre avec Suzanne. Le MJ attribue les fiches aux joueurs. Aucun indice indispensable ne dépend de Suzanne.</p>",
      "<p>Les fiches existantes conservent toutes leurs données et permissions. Décocher Suzanne ne supprime pas sa fiche si elle existe déjà.</p>",
      "<p><strong>Appliquer les portraits</strong> remplace uniquement les images des fiches de ce scénario, de leurs pions prototypes et de leurs pions dans les scènes, y compris Suzanne si elle existe. Les autres données et permissions restent inchangées.</p>",
      `<p>Portraits : ${CHARACTER_IDS.map(id => `<a href="${ASSET_ROOT}/portraits/${id}.webp" target="_blank" rel="noopener">${id === "rene" ? "René" : id[0].toUpperCase() + id.slice(1)}</a>`).join(" · ")}</p>`,
      `<p>La Patiente : <a href="${ASSET_ROOT}/creatures/patiente.webp" target="_blank" rel="noopener">Illustration</a> · <a href="${ASSET_ROOT}/creatures/patiente-token.webp" target="_blank" rel="noopener">Token circulaire transparent</a> (bouton « Créer La Patiente » : fiche avec jets, Corps 12/12 et Esprit 12/12 modifiables, token lié ; les PJ restent inchangés)</p>`,
      `<p><a href="${ASSET_ROOT}/conducteur-les-jours-heureux.html" target="_blank" rel="noopener">Conducteur MJ</a> · `,
      `<a href="${ASSET_ROOT}/plan-joueurs-les-jours-heureux.html" target="_blank" rel="noopener">Plan joueurs</a></p>`,
      "<p>Le conducteur est une aide MJ, accessible par son URL comme les autres fichiers du système. Les notes MJ masquées par la fiche ne constituent pas un stockage confidentiel.</p>"
    ].join(""),
    buttons: {
      create: { icon: '<i class="fa-solid fa-user-plus"></i>', label: "Créer les fiches manquantes", callback: createCharacters },
      monster: { icon: '<i class="fa-solid fa-skull"></i>', label: "Créer La Patiente", callback: createMonster },
      portraits: { icon: '<i class="fa-solid fa-image"></i>', label: "Appliquer les portraits", callback: applyPortraits },
      cancel: { icon: '<i class="fa-solid fa-xmark"></i>', label: "Annuler" }
    },
    default: "cancel"
  }).render(true);
};

export const registerLesJoursHeureuxGenerator = () => {
  Hooks.on("renderActorDirectory", (_app, html) => {
    if (!game.user.isGM || html.find("[data-create-les-jours-heureux]").length) return;
    const actions = html.find(".directory-header .header-actions");
    const target = actions.length ? actions : html.find(".directory-header");
    const button = $('<button type="button" data-create-les-jours-heureux title="Fiches et portraits de Les jours heureux"><i class="fa-solid fa-door-open"></i> Les jours heureux</button>');
    button.on("click", confirmCreation);
    target.append(button);
  });
};
