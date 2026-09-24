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
    gmNotes: "BUT : Faire jouer René face à un Victor qui attend réparation, puis apprendre que le meurtre de la veille était un jeu.\n\nRené veut : Récupérer son pantalon et comprendre ce qu’il a fait. Pourquoi : Il se réveille dans les vêtements du majordome et a oublié la fin de soirée.\nVictor veut : Reprendre son pantalon et obtenir des excuses. Pourquoi : René l’a attaché à une chaise pour prolonger son interrogatoire.\n\nRené avait renversé du vin sur ses vêtements. Victor lui a prêté un pantalon.\n\nVictor attend des excuses : René l’a attaché avec une cravate pour l’interroger pendant le jeu. En échangeant les pantalons, il explique qu’Octave lui avait donné le rôle de l’assassin. Le livret est au salon. Il invite ensuite René à prendre un café.\n\n1 · La restitution des effets personnels\nBUT : Victor réclame ses vêtements et des excuses pour l’humiliation de la veille. René choisit comment lui répondre.\nVictor tient le pantalon de René, lavé et encore humide, plié sur son avant-bras. Il porte lui-même un pantalon de pyjama à petits canards sous sa veste de service. Il reste sur le seuil : « Je vous laisse choisir lequel de nous deux recevra les invités comme cela. » Il souhaite récupérer ses vêtements et entendre des excuses pour la cravate utilisée la veille. Si René invoque les nécessités de l’enquête : « Vous m’avez attaché à une chaise à roulettes, monsieur. J’ai dû vous suivre jusqu’à la cuisine pour continuer mon service. » René peut s’excuser, négocier un échange derrière le rideau de douche ou tenter de conserver son autorité. Victor accepte l’échange et attend la suite avec une patience écrasante.\n\n2 · Le laboratoire de la salle de bains\nBUT : Victor montre les traces des bêtises de René ; celui-ci peut reconstituer sa nuit et négocier la discrétion du majordome.\nSous la cloche à fromage, la chaussure de René porte une étiquette : « SCELLÉ N° 1 — EMPREINTE DU SUSPECT ». Une couche de brie écrasé remplit les rainures de la semelle. Sur le miroir, tracé au savon : « LE COUPABLE CHAUSSE DU 43. » Sa propre pointure. René avait marché dans le plateau de fromages, suivi ses empreintes jusqu’ici, puis annoncé qu’il tenait enfin une piste sérieuse. Victor attend de voir ce qu’il en conclut avant d’ajouter : « Vous avez demandé qu’on vous laisse seul avec le suspect. Nous avons respecté cette consigne. » René peut reconstituer sa démonstration, contester le classement des pièces ou demander à Victor qui a assisté à cette performance. Victor promet sa discrétion contre une explication présentable pour le plateau de fromages.\n\n3 · Les aveux du majordome\nBUT : Victor veut clore l’interrogatoire. Ses explications apprennent à René qu’Octave jouait le mort et que le livret est au salon.\nVictor sort de sa poche un menu couvert de notes. Sous « AVEUX SPONTANÉS », René a écrit : « Reconnaît le meurtre. Reconnaît avoir resservi. Refuse d’avouer pour la béchamel. » Victor avait accepté de jouer l’assassin pour Octave ; René a prolongé son interrogatoire après la fin de la représentation, puis interrogé le dîner. « Vous avez demandé à la sauce où elle se trouvait entre vingt-deux heures et vingt-deux heures quinze. » Si René demande des précisions sur le meurtre, Victor décrit le couteau rétractable, le faux sang et le toast d’Octave après s’être relevé. Il indique le livret au salon. Il répond dès qu’on le questionne, même si René refuse toujours de s’excuser. Pour finir, il pose le menu devant lui : « Souhaitez-vous classer la béchamel, ou dois-je la garder au frais pour confrontation ? »\n\nVictor annonce le café. Il propose à René de descendre avec lui ou de le rejoindre après s’être habillé. Sur le seuil, il désigne la chaussure sous cloche : « Vous emportez votre pièce à conviction, ou je la sers avec les toasts ? »"
  },
  {
    id: "jeanne", name: "Jeanne Vidal", profession: "Détective méthodique", subfolder: PC_FOLDER,
    background: "Détective indépendante, vous classez vos preuves et vérifiez chaque détail. Vous connaissez la réputation de René et appréciez les résultats de Malik. Vous avez reçu l’invitation d’Octave pour votre travail d’enquêtrice.\n\nVous ouvrez les yeux. Quelque chose craque contre vos côtes. Votre torse est emballé dans plusieurs épaisseurs de film alimentaire, par-dessus vos vêtements. Le gros classeur rouge est plaqué contre votre poitrine. Vous êtes scotchée à une chaise de bureau. Vous portez une passoire sur la tête. Sur votre genou, de votre écriture : « COFFRE-FORT. FRAGILE. » Une ficelle relie votre chaise à la porte, en passant par une pyramide de cuillères. Derrière la porte, une voix très douce : « Madame Vidal ? Céleste Arnaud. Vous m’avez demandé de revenir avec une pièce d’identité et des ciseaux. J’ai les deux. »",
    equipment: "Classeur rouge ; film alimentaire ; passoire ; alarme de cuillères.",
    gmNotes: "BUT : Mettre le sort du classeur entre les mains de Jeanne pendant que Céleste cherche à le récupérer.\n\nJeanne veut : Se libérer et découvrir pourquoi elle protège ce classeur. Pourquoi : Octave lui a confié les preuves pendant la nuit ; elle a oublié cette conversation.\nCéleste veut : Prendre le classeur, puis brûler les feuilles au salon. Pourquoi : Il prouve ses détournements d’argent. Elle utilise l’aide proposée à Jeanne pour approcher les documents.\n\nAprès avoir reçu les preuves d’Octave, Jeanne a décidé que son propre corps serait le coffre le plus sûr du manoir. Elle a testé plusieurs systèmes, puis s’est endormie pendant l’essai final. Le classeur contient les détournements de Céleste ; la copie reste sous le buvard d’Octave.\n\nCéleste veut récupérer le classeur. Elle propose de découper l’emballage et de ranger les documents pendant que Jeanne se débarbouille. Joue-la comme une professionnelle venue prendre en charge un incident de bureau particulièrement embarrassant. Jeanne a les mains libres : elle peut arracher le film, lire le classeur, bricoler son alarme ou négocier l’aide de Céleste.\n\n1 · L’audit de sécurité\nBUT : Jeanne découvre son installation. Céleste la félicite pour gagner sa confiance et obtenir l’ouverture de la porte.\nLaisse Jeanne examiner son œuvre. La passoire porte une étiquette « PROTECTION DES DONNÉES ». Dans sa poche : une liste de tests. « Vol du classeur : impossible. Déplacement : médiocre. Toilettes : à revoir. » Sur la table, un verre d’eau et une paille particulièrement longue : elle avait prévu de tenir un siège. Céleste, depuis le palier : « Vous m’avez également demandé de vous féliciter. Votre dispositif est très impressionnant. » Demande ce que Jeanne veut sauver en premier : sa dignité, son système ou ses documents. Ses gestes déclenchent la suite.\n\n2 · Le service après-vente\nBUT : Céleste veut savoir si Jeanne a lu les preuves et la convaincre de lui remettre le classeur en le présentant comme un accessoire.\nCéleste glisse sa carte professionnelle sous la porte. Elle réclame le classeur comme un accessoire oublié par Octave, puis demande : « Vous avez eu le courage de lire tout ça ? » Si Jeanne exige une procédure, Céleste s’y plie : mot de passe improvisé, reçu, serment devant la passoire. Elle est prête à accepter une humiliation pour obtenir les feuilles. Elle pose un café tout près de la porte : « Je vous le tiens pendant que vous vous libérez ? » Si Jeanne lit le dossier, laisse-la poser ses questions. Céleste parle d’un litige comptable qu’Octave avait beaucoup dramatisé.\n\n3 · L’alarme fonctionne\nBUT : Céleste profite du déménagement pour proposer de prendre le classeur. Jeanne décide ce qu’elle lui confie et peut la suivre.\nLorsque Jeanne déplace sa chaise ou ouvre la porte, annonce que la ficelle se tend. Elle peut la décrocher, la couper ou laisser faire. Si les cuillères tombent, un petit papier apparaît sous la pile : « TEST CONCLUANT. » Céleste tend aussitôt les bras vers Jeanne et le classeur : « Je prends ce qui gêne. » Demande précisément ce que Jeanne lui laisse toucher. Si elle obtient les documents, Céleste gagne le salon pour les brûler ; Jeanne peut la suivre ou réclamer leur restitution. Si Jeanne les garde, Céleste propose de les remettre ensemble à Octave après le café.\n\nJeanne rejoint le petit déjeuner avec ce qu’elle a choisi de conserver. Céleste lui retire solennellement une dernière cuillère accrochée dans le dos : « Votre installation déborde. » Le sort du classeur dépend des décisions de Jeanne.\n\nDocument A3 : preuves des détournements de Céleste."
  },
  {
    id: "malik", name: "Malik Serra", profession: "Privé débrouillard", subfolder: PC_FOLDER,
    background: "Détective privé, vous retrouvez des gens et réglez leurs problèmes. Vous savez négocier et comprendre ce que chacun cherche à protéger. René vous a sorti d’un mauvais pas ; Jeanne a sauvé l’un de vos dossiers.\n\nVous vous réveillez sous la table de la cuisine. Votre poignet est menotté à un chariot de service. Sur le chariot : une caisse à pommes, une oie vivante et une pancarte « GARDE À VUE ». L’oie vous regarde. Vous la regardez. Elle arrache un morceau de la pancarte et le mange. Vous portez une toque, à laquelle quelqu’un a agrafé votre carte de détective. Victor entre avec un plateau. Il contemple l’installation. « Monsieur Serra. Bérénice souhaite porter plainte. » Il désigne l’oie. « Je vous avais demandé de la faire sortir de la cuisine. Vous avez ouvert une enquête. »",
    equipment: "Menottes reliées au chariot ; toque ; dictaphone ; feuille signée de nettoyage.",
    gmNotes: "BUT : Faire sortir Malik de son pétrin, puis lui donner le dictaphone et le témoignage de Victor sur Agathe.\n\nMalik veut : Se libérer des menottes et comprendre son enquête nocturne. Pourquoi : Il a arrêté une oie pour vol de pain et s’est attaché au chariot qui la transporte.\nVictor veut : Faire sortir l’oie et remettre la cuisine en état. Pourquoi : Il doit préparer le café ; le poste de police improvisé encombre tout.\nBérénice veut : Garder son pain et en trouver davantage. Pourquoi : C’est une oie gourmande : elle défend sa réserve et suit la nourriture.\n\nBérénice est une oie du domaine, entrée chercher des miettes pendant les préparatifs d’une omelette. Malik l’a arrêtée pour vol, a installé un poste de police dans la cuisine, puis s’est menotté au chariot pour assurer le transfert. Il avait récupéré son dictaphone dans la bibliothèque avant cette expédition.\n\nVictor veut récupérer sa cuisine et envoyer Bérénice dans la cour. Malik doit se libérer, gérer une oie qui défend son pain et répondre de son enquête nocturne. La clé des menottes est sous la corbeille à pain, au fond de la caisse. Son dictaphone est toujours dans sa poche. Victor peut l’aider dès qu’ils conviennent d’une façon de faire.\n\n1 · Un dossier accablant\nBUT : Victor veut que Malik assume le désordre. Les objets du faux commissariat montrent jusqu’où son zèle l’a conduit.\nSur la table, une baguette porte des traits de crayon et la mention « ARME DU CRIME ». Un œuf repose dans un coquetier étiqueté « COMPLICE PRÉSUMÉ ». Le procès-verbal : « Nom : Bérénice. Profession : oie. Motif du refus de parler : arrogance. » Puis : « Le suspect a tenté de manger sa déposition. » Victor explique que Malik a voulu prendre ses empreintes : des pattes farinées couvrent le plan de travail. Il lui tend une feuille : « Je nettoie tout demain », signée de sa main. « Nous sommes demain. » Laisse Malik défendre son travail, libérer sa détenue ou poursuivre l’interrogatoire.\n\n2 · Le transfert du prévenu\nBUT : Malik peut récupérer la clé pendant que Victor aide à déplacer l’oie. Bérénice défend le pain sous lequel la clé est cachée.\nBérénice siffle quand une main approche de sa réserve ; elle suit volontiers un morceau de pain. Victor a vu Malik cacher la clé sous la corbeille. Le joueur peut distraire l’oie, demander à Victor de la tenir ou pousser le chariot jusqu’à la porte de service. Décris l’obstacle avant chaque geste : la roue s’accroche dans le tapis, l’oie grimpe sur la poignée, la pile d’assiettes tremble. Joue un incident à la fois. Si le pain tombe au sol, Bérénice saute de la caisse et l’emporte : Malik décide comment gérer cette évasion sous les yeux du majordome.\n\n3 · Le témoin humain\nBUT : Victor raconte ce qu’il a vu d’Agathe et signale le dictaphone. L’enregistrement permet d’entendre Octave vivant après le jeu.\nEn servant le café, Victor devient bavard. Il a croisé Agathe sortant de la bibliothèque avec une enveloppe. Elle lui a demandé de garder sa visite pour lui. Puis il désigne la poche de Malik : « Votre appareil a survécu. Vous l’avez cherché avant de commencer l’affaire des volailles. » Sors le document du dictaphone si Malik l’écoute. Pendant cette conversation, Bérénice peut réapparaître dans l’encadrement de la porte, attirée par le pain du petit déjeuner. Victor la désigne à Malik : « Votre cliente est revenue. » Une dernière décision, puis le café est prêt.\n\nMalik rejoint les autres avec son dictaphone et le plateau. Victor lui remet l’œuf sous scellé, posé dans une tasse : « Vous aviez demandé une cellule individuelle. »\n\nDocument A2 : Octave vivant après le jeu."
  },
  {
    id: "diane", name: "Diane Vasseur", profession: "Détective médiatique", subfolder: PC_FOLDER,
    background: "Détective connue de la presse, vous aimez provoquer des réactions et obtenir des confidences. René vous trouve théâtrale ; Jeanne vérifie vos intuitions. Octave vous a invitée pour ajouter du prestige à sa soirée.\n\nVous ouvrez les yeux sur la méridienne d’Agathe. Un rideau de dentelle vous sert de voile. Vous tenez un bouquet de poireaux noué d’un ruban. Sur le lit, à votre hauteur, un immense portrait d’homme à moustache porte un nœud papillon fixé au cadre. Deux coupes vides sont posées devant lui. Un carton décoré de cœurs annonce : « DIANE ET LE BARON — POUR TOUJOURS ». Agathe vous observe depuis une chaise. « Bonjour, mamie. Vous avez ma bague. » Elle désigne le portrait. « Mon arrière-grand-père. Vous avez insisté pour la suite nuptiale. »",
    equipment: "Voile en rideau ; bouquet de poireaux ; bague d’Agathe dans votre poche.",
    gmNotes: "BUT : Faire jouer les conséquences du faux mariage, puis ouvrir une conversation sur Agathe et la photo de la soirée.\n\nDiane veut : Comprendre sa cérémonie et sortir de cette situation avec dignité. Pourquoi : Elle a épousé un portrait pendant la cuite et emprunté la bague d’Agathe.\nAgathe veut : Récupérer sa bague, ranger le portrait et savoir ce que Diane se rappelle. Pourquoi : Elle a confié son envie de partir à Diane et craint que les questions révèlent l’argent volé à son père.\n\nDiane a expliqué qu’épouser un Delmas serait le moyen le plus rapide d’enquêter de l’intérieur. Agathe lui a présenté le portrait de son arrière-grand-père. La plaisanterie est devenue une cérémonie, avec bague empruntée et discours de Victor. Agathe a aussi confié son envie de partir. Elle cache l’argent pris à son père après le jeu.\n\nAgathe veut sa bague, qui se trouve dans la poche de Diane, et de l’aide pour remettre le portrait dans le couloir. Elle savoure la situation, tout en cherchant à savoir ce que Diane se rappelle de leurs confidences. La photo de la soirée repose sur la table de nuit. Laisse Diane découvrir les traces de sa cérémonie et décider comment traiter sa nouvelle famille.\n\n1 · Le lendemain des noces\nBUT : Agathe réclame sa bague tout en taquinant Diane. Le récit de la cérémonie donne au joueur de quoi sauver la face ou jouer la baronne.\nAgathe détaille la soirée avec une gravité parfaite : Diane a demandé le consentement du portrait, interprété son silence comme de la pudeur, puis porté elle-même son époux jusqu’à la chambre. Victor a accepté d’officier en échange de la promesse qu’on le laisserait dormir. Sur le menu retourné, les vœux : « Je promets de résoudre tes mystères et de te dépoussiérer. » Si Diane conteste, Agathe lui montre le bouquet : « Vous avez refusé les fleurs. Vous vouliez du concret. » Si elle entre dans le jeu, Agathe lui demande aussitôt une avance sur son héritage.\n\n2 · Sortir monsieur de la chambre\nBUT : Agathe veut remettre le portrait dans le couloir. Le rangement peut exposer son enveloppe d’argent et donner à Diane une question à poser.\nLe cadre est assez large pour obliger deux personnes à le tourner dans la porte. Agathe propose que Diane prenne « les épaules de son mari ». Le rideau traîne, le bouquet gêne, un chausson est coincé derrière le cadre. Laisse le joueur organiser le déménagement, appeler de l’aide ou abandonner son époux sur le lit. Si Diane cherche sa chaussure près de la valise d’Agathe, elle aperçoit une enveloppe bourrée de billets. Agathe la range : « Mes économies. » Diane peut questionner, négocier ou garder cette observation pour plus tard.\n\n3 · Les confidences de la jeune génération\nBUT : Agathe cherche à mesurer les souvenirs de Diane. La conversation peut révéler sa visite à son père ; la photo montre le bracelet de Céleste.\nQuand Diane rend la bague ou l’aide, Agathe se radoucit : « Vous vous souvenez de ce que je vous ai dit sur mon père ? » Elle voulait quitter le manoir et Diane lui avait proposé de l’aider à organiser son départ. Si on l’interroge sur l’argent, Agathe commence par parler de ses économies ; si Diane insiste sur sa visite à la bibliothèque, elle peut avouer le vol et raconter qu’Octave lui a parlé après le jeu. La photo sur la table attire aussi son attention : « Celle-là, c’était avant que vous entriez dans la famille. » Donne la photo si Diane la regarde ; le bracelet de Céleste y est visible.\n\nAgathe annonce le café. Avant de sortir, elle propose à Diane d’emporter le portrait : « Il prend peu de place à table. » Au petit déjeuner, Victor peut saluer Diane d’un impeccable « Madame la baronne »."
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
