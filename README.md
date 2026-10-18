# Pratique Sec 2

Site de pratique hebdomadaire : grammaire, conjugaison, finales de verbes en [é] (extraits de littérature française du domaine public), rédaction de 100 mots et maths (programme du Secondaire 2 au Québec).

- Tout fonctionne dans le navigateur : aucun compte, aucune donnée envoyée.
- Les exercices changent automatiquement chaque lundi. Le bouton « Nouvelle série » en donne d'autres.
- Environ 1 question sur 4 révise les thèmes des semaines précédentes.

## Changer les thèmes de la semaine

Modifie **`themes.js`** (sur github.com : ouvre le fichier → icône crayon → « Commit changes »). Le site se met à jour en une minute environ. La liste des thèmes possibles est en haut du fichier.

Un nom de thème mal écrit s'affiche en rouge en haut du site.

## Ajouter des questions de grammaire ou des sujets de rédaction

Dans **`banque.js`** : copie une ligne existante et modifie-la.

## Tester une autre semaine

Ajoute `?date=2027-01-20` à la fin de l'adresse du site.

## Vérification (pour les développeurs)

```bash
node test.js
```
