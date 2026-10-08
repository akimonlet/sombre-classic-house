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
- générateur MJ optionnel d’**Un meurtre de trop** : quatre détectives et trois PNJ, portraits peints, scènes de réveil et informations MJ ;
- conducteur condensé en trois vues et plan joueurs sur deux niveaux dans `assets/scenarios/un-meurtre-de-trop/` ;
- générateur MJ optionnel de **Les jours heureux** : trois ou quatre patients amnésiques, portraits distincts, biographies imposées et notes MJ ; conducteur interactif et plan joueurs dans `assets/scenarios/les-jours-heureux/` ;
- champs libres pour les relations, le background, l'équipement, les secrets et les notes MJ.

## Jouer à Un meurtre de trop

1. Dans l’annuaire des acteurs, cliquer sur **Un meurtre de trop**, puis confirmer la création.
2. Les sept fiches sont rangées dans `Scénarios personnalisés / Un meurtre de trop`. Attribuer René, Jeanne, Malik et Diane aux quatre joueurs via les permissions des fiches.
3. Ouvrir `assets/scenarios/un-meurtre-de-trop/conducteur-un-meurtre-de-trop.html` : **L’essentiel**, **Les réveils**, **Le manoir**.
4. Partager uniquement `plan-joueurs-un-meurtre-de-trop.html` et les documents choisis depuis le conducteur. Le conducteur contient la solution et reste une aide MJ ; les fichiers du système sont accessibles par leur URL.

Les fiches démarrent avec Corps et Esprit à 12 ; les choix de Personnalité et de Traits restent disponibles. Un second clic complète les fiches manquantes et conserve les modifications des fiches déjà créées.

Dans la fenêtre **Un meurtre de trop** :
- **Appliquer les portraits** actualise les images des fiches du scénario et de leurs tokens. Les caractéristiques, notes, permissions et positions sont conservées.
- **Créer la scène d’accueil** ajoute un écran du manoir à l’aube, avec le titre du scénario. Le MJ l’active lorsqu’il est prêt. Une scène déjà créée est conservée.

L’image `landing-un-meurtre-de-trop.webp` sert de fond à la scène Foundry ; `landing-un-meurtre-de-trop.html` offre le même accueil en plein écran dans un navigateur. Les sept portraits se trouvent dans `portraits/`.

Les quatre réveils comportent trois relances chacun dans le conducteur. Un encadré résume le but de chaque scène, ce que chacun veut et pourquoi ; chaque relance affiche aussi son objectif. René conserve son ouverture avec Victor et les pantalons ; ses relances développent les excuses, la chaussure sous scellés et les aveux du majordome. Les nouvelles fiches reprennent ces ouvertures ; les backgrounds des fiches déjà créées restent conservés.

Les pages HTML sont autonomes. Le plan joueurs présente les pièces ; les positions des marqueurs restent enregistrées dans le navigateur du MJ.

## Jouer à Les jours heureux

1. Avec le compte du **MJ actif désigné par Foundry V12** (`game.users.activeGM`), ouvrir l’annuaire des acteurs et cliquer sur **Les jours heureux**. L’ouverture du menu ne crée rien ; **Annuler** est le bouton par défaut.
2. Laisser **Inclure Suzanne, 4e PJ optionnel** coché pour préparer les quatre fiches, ou le décocher pour jouer à trois. Confirmer **Créer les fiches manquantes**.
3. Les fiches apparaissent dans `Scénarios personnalisés / Les jours heureux / 1. Personnages Joueurs`. Attribuer les permissions aux joueurs manuellement : aucune attribution ni permission publique n’est ajoutée.
4. Ouvrir `assets/scenarios/les-jours-heureux/conducteur-les-jours-heureux.html` pour les réveils, les récréations et le plan MJ. La fiche de Suzanne reste consultable dans le conducteur même à trois joueurs ; aucun indice essentiel ne dépend d’elle.
5. Partager uniquement `plan-joueurs-les-jours-heureux.html` et les fiches joueurs exportées volontairement depuis le conducteur. Le plan joueurs ne contient ni identités réelles, ni notes MJ, ni marqueur de menace.

| Fiche publique — identité imposée | Corps actuel / max | Esprit actuel / max |
| --- | --- | --- |
| René Vautrin | 7 / 12 | 5 / 12 |
| Madeleine Aubry | 5 / 12 | 7 / 12 |
| Lucien Morel | 8 / 12 | 4 / 12 |
| Suzanne Mercier — optionnelle | 4 / 12 | 8 / 12 |

Ces valeurs basses sont **un choix maison intentionnel du scénario**, pas des maxima réduits ou des valeurs à normaliser. L’Adrénaline commence à **0 / 3**. Les choix de Personnalité, d’Avantage et de Désavantage restent disponibles ; les tirages de nom et de profession sont verrouillés pour les joueurs.

Toutes les professions publiques indiquent **Patient amnésique**. Le background commence par « Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir. » et contient uniquement la biographie imposée et une familiarité. L’équipement initial se limite à la chemise de coton et aux chaussons. Les identités réelles, les ouvertures et les fragments de mémoire figurent uniquement dans `system.gmNotes`, jamais dans les secrets partageables ni dans les noms de fiches ou de pions.

- **Relancer la création** ajoute seulement les identifiants manquants (`flags.sombre-classic-house.lesJoursHeureuxId` : `rene`, `madeleine`, `lucien`, `suzanne`). Les fiches existantes gardent noms, biographies, caractéristiques, inventaire, portraits, dossiers, notes et permissions. Ne pas effacer ces flags si l’on veut conserver cette détection.
- **Décocher Suzanne** ne supprime ni ne modifie sa fiche préparée. La recocher permet de l’ajouter plus tard sans toucher aux trois autres.
- **Appliquer les portraits** est une action séparée et explicite : elle remplace seulement `img`, `prototypeToken.texture.src` et `texture.src` des pions de scène associés aux fiches marquées, liés ou non liés. Les positions, noms, échelles, données de jeu et permissions restent inchangés. Elle inclut Suzanne si sa fiche existe, quelle que soit la case du menu.
- Seul le MJ actif peut écrire ; les autres MJ reçoivent un avertissement. Un verrou local empêche les actions simultanées dans plusieurs fenêtres du même client. **Utiliser un seul onglet sur le compte du MJ actif** : ce verrou n’est pas une transaction distribuée entre plusieurs onglets du même compte. Si le MJ actif change pendant l’opération, les écritures suivantes sont interrompues ; une relance complète les éléments manquants sans réinitialiser le reste.
- Les quatre portraits optimisés sont dans `assets/scenarios/les-jours-heureux/portraits/`. Aucune scène, aucun pion placé et aucun PNJ ne sont créés par ce générateur.

**Limite de confidentialité :** `gmNotes` est masqué dans l’interface joueur, pas chiffré ni isolé des données de l’Actor. Le conducteur et le code du système sont également accessibles par leur URL. Cette séparation évite les révélations accidentelles dans la fiche publique ; elle ne protège pas contre un joueur qui inspecte les données ou les fichiers servis. Le conducteur reste une aide réservée à l’usage du MJ.

### Vérification locale des générateurs

Depuis la racine du dépôt, avec Node.js :

```sh
node --test tests/*.test.mjs
```

Les tests de **Les jours heureux** exercent les frontières Foundry simulées dans des clients indépendants : confirmation, présence optionnelle, conservation intégrale des fiches existantes, permissions et changement de MJ actif, concurrence, reprises après erreur, portraits et pions. Ils vérifient aussi les ressources, les identités publiques, la cohérence avec le conducteur livré, les quatre WebP et l’absence de révélations dans le plan joueurs. Ils ne se connectent à aucun monde Foundry et ne certifient pas une installation live.

## Contenu volontairement absent

- aucun Actor ni dossier créé automatiquement ;
- le contenu optionnel d'**HÉLIX 2008** n’apparaît que si le MJ clique sur son bouton dans l’annuaire des acteurs ;
- le contenu optionnel de **PATROUILLE 13** n’apparaît que si le MJ clique sur son bouton dans l’annuaire des acteurs ;
- aucun plan, texte de scénario ou aide de jeu injecté de force ;
- aucune suppression automatique des Actors déjà présents dans un monde existant.

## Limites

- cible exclusivement Foundry VTT 12 ;
- les aides des Traits synthétisent leurs effets décrits dans *Sombre 1*, pages 15 à 18.
