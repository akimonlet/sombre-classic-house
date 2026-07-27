export const PERSONALITIES = [
  ["Affectueux", "Possessif", "Abusif"],
  ["Arrogant", "Orgueilleux", "Mégalomane"],
  ["Brutal", "Cruel", "Sadique"],
  ["Charmeur", "Débauché", "Pervers"],
  ["Conformiste", "Réactionnaire", "Puritain"],
  ["Cynique", "Désabusé", "Malfaisant"],
  ["Désinvolte", "Sauvage", "Bestial"],
  ["Discipliné", "Autoritaire", "Tyrannique"],
  ["Distant", "Insensible", "Misanthrope"],
  ["Docile", "Soumis", "Servile"],
  ["Égocentrique", "Narcissique", "Individualiste"],
  ["Excentrique", "Illuminé", "Mystique"],
  ["Fragile", "Maladif", "Morbide"],
  ["Impulsif", "Téméraire", "Suicidaire"],
  ["Irritable", "Aigri", "Haineux"],
  ["Mélancolique", "Défaitiste", "Dépressif"],
  ["Méthodique", "Maniaque", "Obsessionnel"],
  ["Nerveux", "Agité", "Frénétique"],
  ["Paresseux", "Passif", "Masochiste"],
  ["Passionné", "Acharné", "Fanatique"],
  ["Prudent", "Méfiant", "Paranoïaque"],
  ["Rebelle", "Révolté", "Asocial"],
  ["Rusé", "Sournois", "Diabolique"],
  ["Timide", "Anxieux", "Angoissé"]
];

// Sélection compatible avec les restrictions de House of the Rising Dead.
export const ADVANTAGES = [
  "Ambidextre", "Atypique", "Bagarreur", "Chef", "Dernier souffle",
  "Endurci", "Faveur", "Folie douce", "Fort", "In extremis",
  "Irrésistible", "Lascar", "Lucidité", "Miraculé", "Notable",
  "Porte-bonheur", "Rêve lucide", "Tir", "Vétéran", "Vigilant"
];

export const DISADVANTAGES = [
  "Amnésique", "Bipolaire", "Cardiaque", "Cauchemars", "Chagrin",
  "Chétif", "Code de conduite", "Dévoué", "Dissocié", "Drogué",
  "Écervelé", "Ennemi mortel", "Inapte", "Invalide", "Maladroit",
  "Panique", "Panne", "Somnambule", "Trauma", "Vieux"
];

// Aides de lecture synthétiques d'après les règles de Sombre 1, p. 15 à 18.
export const TRAIT_HELP = {
  "Ambidextre": "Avec une arme de contact dans chaque main, lance 2d6 de dommages et conserve le meilleur résultat.",
  "Atypique": "Compose ta Personnalité en mélangeant des cartes provenant de plusieurs Personnalités.",
  "Bagarreur": "Lorsque tu attaques en cochant ton Adrénaline, tu infliges des dommages à mains nues.",
  "Chef": "Donne un ordre sensé à tes subalternes et dépense 1 Adrénaline : ils l’exécutent.",
  "Dernier souffle": "Lorsque tous tes cercles de Corps sont cochés, tes cercles d’Adrénaline les remplacent.",
  "Endurci": "Lorsque tu subis des Séquelles, tu ne coches jamais plus d’un cercle d’Esprit à la fois.",
  "Faveur": "Une fois par partie, demande un service raisonnable à quelqu’un qui t’est redevable : il doit l’accorder.",
  "Folie douce": "Même lorsque ton personnage devient fou, tu continues de le jouer.",
  "Fort": "Tes dommages fixes infligent 4 Blessures.",
  "In extremis": "Une fois par partie, transforme un échec en réussite de justesse : le résultat de ton d20 devient 1.",
  "Irrésistible": "Personne ne repousse tes avances sans une bonne raison.",
  "Lascar": "Tu maîtrises les pratiques de la rue : cambriolage, crochetage, pickpocket et vol de voiture.",
  "Lucidité": "Coche 1 Adrénaline pour effectuer tes jets d’Esprit sous 12.",
  "Miraculé": "Une fois par partie, réduis à 3 les Blessures que tu reçois.",
  "Notable": "Tu es quelqu’un d’important : tu disposes de relations, de notoriété et d’argent.",
  "Porte-bonheur": "Choisis quelqu’un qui te porte chance : près de lui, un résultat de 13 au d20 est une réussite.",
  "Rêve lucide": "Une fois par partie, modifie consciemment l’un de tes rêves.",
  "Tir": "Tu manies les armes à feu en expert.",
  "Vétéran": "Une fois par partie, tu peux cocher ton Adrénaline après avoir effectué ton jet de Corps.",
  "Vigilant": "Tu n’es jamais surpris.",
  "Amnésique": "Ta mémoire flanche.",
  "Bipolaire": "Tu as deux Personnalités et passes de l’une à l’autre en cochant des Séquelles ou sur demande du meneur.",
  "Cardiaque": "Une fois par partie, tu subis un infarctus : lance autant de d6 que le numéro de ta phase d’Esprit.",
  "Cauchemars": "Tes rêves sont des événements terrifiants.",
  "Chagrin": "Tu as vécu un drame : tous tes jets d’Esprit échouent automatiquement.",
  "Chétif": "Tu n’infliges que des dommages fixes.",
  "Code de conduite": "Définis des règles de vie : si tu les transgresses, tu subis des Séquelles.",
  "Dévoué": "Choisis quelqu’un à protéger : tu ne l’abandonneras ni ne le trahiras et te sacrifieras si nécessaire.",
  "Dissocié": "Plusieurs personnalités cohabitent dans ta tête ; chacune est jouée par une personne différente.",
  "Drogué": "Consommer te fait risquer des Blessures d’attrition ; le manque te fait subir des Séquelles.",
  "Écervelé": "Une fois par partie, le meneur t’impose une décision stupide ou une action imprudente.",
  "Ennemi mortel": "Quelqu’un a des raisons personnelles de vouloir te tuer et ne renoncera jamais.",
  "Inapte": "Choisis une action dont tu es incapable, par exemple nager, courir ou conduire.",
  "Invalide": "Selon ton état, précoche 1 à 3 cercles de Corps ; le meneur fixe ce nombre à la création.",
  "Maladroit": "Sous Adrénaline, ton Corps vaut 9, 10 ou 11 ; le meneur choisit cette valeur à la création.",
  "Panique": "Chaque fois que tu coches 1 Adrénaline, coche également 1 Esprit.",
  "Panne": "Près de toi, les objets technologiques ont tendance à mal fonctionner.",
  "Somnambule": "Certaines nuits, tu te lèves et agis pendant ton sommeil.",
  "Trauma": "À la suite d’une agression ou d’un accident grave, ton premier cercle d’Adrénaline est précoché.",
  "Vieux": "Tu ne peux attaquer qu’en cochant 1 Adrénaline."
};

export const FIRST_NAMES = [
  "Angela", "Barbara", "Carol", "Cynthia", "Deborah", "Dolores", "Donna",
  "Gloria", "Karen", "Linda", "Maria", "Patricia", "Rosa", "Susan",
  "Teresa", "Yolanda", "Anthony", "Carlos", "Charles", "Clarence", "David",
  "Edward", "Frank", "James", "Jesse", "John", "José", "Joseph", "Luis",
  "Michael", "Miguel", "Ramón", "Richard", "Robert", "Thomas", "William"
];

export const LAST_NAMES = [
  "Anderson", "Brown", "Davis", "Flores", "Garcia", "Gonzalez", "Harris",
  "Hernandez", "Jackson", "Jefferson", "Johnson", "Jones", "Lopez", "Martin",
  "Martinez", "Miller", "Moore", "Perez", "Ramirez", "Robinson", "Rodriguez",
  "Smith", "Taylor", "Thomas", "Thompson", "Washington", "White", "Williams",
  "Wilson"
];

export const PROFESSIONS = [
  "Agent de police", "Aide-soignant", "Caissier", "Chauffeur routier",
  "Coiffeur", "Comptable", "Cuisinier de diner", "Employé de banque",
  "Employé de station-service", "Étudiant", "Facteur", "Femme au foyer",
  "Gardien de nuit", "Infirmier", "Instituteur", "Journaliste local",
  "Manœuvre agricole", "Mécanicien automobile", "Ouvrier du bâtiment",
  "Ouvrier du pétrole", "Ouvrier d’usine", "Pasteur", "Plombier",
  "Rancher", "Représentant de commerce", "Secrétaire", "Serveur",
  "Technicien radio", "Vendeur de quincaillerie", "Vétérinaire"
];

export const SPECIAL_CARDS = [
  "Revolver",
  "Petit sac à dos",
  "Rien",
  "Jeu de cartes",
  "Aucune"
];
