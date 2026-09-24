# Sombre Classic — Fiche pour Foundry VTT 12

Système personnel fournissant une fiche **Sombre Classic** et ses outils de jeu, sans création automatique de scénario, dossier ou personnage.

## Installation manuelle

1. Arrêter Foundry.
2. Extraire le dossier `sombre-classic-house` dans `FoundryVTT/Data/systems/`.
3. Redémarrer Foundry.
4. Créer un monde en choisissant le système **Sombre Classic — Fiche**.
5. Créer uniquement les Actors nécessaires à la partie.

Le nom du dossier doit rester exactement `sombre-classic-house`.

## Fonctionnalités

- fiche sauvegardée par Foundry ;
- 24 Personnalités avec leurs trois phases et leur guide de roleplay ;
- Avantages et Désavantages avec leurs aides de lecture ;
- générateurs de nom, profession, Personnalité et Traits ;
- choix ou tirage unique de la Personnalité, de l’Avantage et du Désavantage par chaque joueur ;
- cadenas contrôlés par le MJ, avec réouverture individuelle ou globale des choix ;
- Corps et Esprit réglables par clic ;
- Adrénaline et phases de Personnalité automatisées ;
- jets de Corps, d'Esprit, d'attaque et de dommages dans le chat ;
- Corps et Esprit utilisables comme barres de token ;
- synchronisation du nom du personnage et du joueur avec le Prototype Token ;
- nom des tokens affiché pour tout le monde ;
- récapitulatif MJ interactif des Traits des acteurs ;
- générateur MJ optionnel des 15 fiches d'**HÉLIX 2008** (5 PJ, 5 PNJ, 5 Monstres avec tokens peints dédiés, inventaires complets et secrets), rangées dans `Scénarios personnalisés / HÉLIX 2008` ;
- générateur MJ optionnel des 15 fiches de **PATROUILLE 13** : 4 policiers prétirés attribués à Crevetolog, Pikiou, Grelot et Max, avec portraits dédiés, plus 10 PNJ et Élias Varga, avec tokens, équipement, relations et informations MJ ;
- conducteur interactif, scénario Markdown et plan interactif en trois niveaux de **PATROUILLE 13** inclus dans `assets/scenarios/patrouille-13/` ;
- générateur MJ optionnel d’**Un meurtre de trop** : quatre détectives et trois PNJ, jetons à initiales, scènes de réveil et informations MJ ;
- conducteur condensé en trois vues et plan joueurs sur deux niveaux dans `assets/scenarios/un-meurtre-de-trop/` ;
- champs libres pour les relations, le background, l'équipement, les secrets et les notes MJ.

## Jouer à Un meurtre de trop

1. Dans l’annuaire des acteurs, cliquer sur **Un meurtre de trop**, puis confirmer la création.
2. Les sept fiches sont rangées dans `Scénarios personnalisés / Un meurtre de trop`. Attribuer René, Jeanne, Malik et Diane aux quatre joueurs via les permissions des fiches.
3. Ouvrir `assets/scenarios/un-meurtre-de-trop/conducteur-un-meurtre-de-trop.html` : **L’essentiel**, **Les réveils**, **Le manoir**.
4. Partager uniquement `plan-joueurs-un-meurtre-de-trop.html` et les documents choisis depuis le conducteur. Le conducteur contient la solution et reste une aide MJ ; les fichiers du système sont accessibles par leur URL.

Les fiches démarrent avec Corps et Esprit à 12 ; les choix de Personnalité et de Traits restent disponibles. Un second clic complète les fiches manquantes et conserve les modifications des fiches déjà créées. Les jetons utilisent les initiales des personnages.

Les deux pages HTML sont autonomes. Le plan joueurs présente les pièces ; les positions des marqueurs restent enregistrées dans le navigateur du MJ.

## Contenu volontairement absent

- aucun Actor ni dossier créé automatiquement ;
- le contenu optionnel d'**HÉLIX 2008** n’apparaît que si le MJ clique sur son bouton dans l’annuaire des acteurs ;
- le contenu optionnel de **PATROUILLE 13** n’apparaît que si le MJ clique sur son bouton dans l’annuaire des acteurs ;
- aucun plan, texte de scénario ou aide de jeu injecté de force ;
- aucune suppression automatique des Actors déjà présents dans un monde existant.

## Limites

- cible exclusivement Foundry VTT 12 ;
- les aides des Traits synthétisent leurs effets décrits dans *Sombre 1*, pages 15 à 18.
