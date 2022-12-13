# Carnet d'adresse

## Objectifs pédagogiques

1. Développer une application de type CRUD entièrement côté client avec JavaScript
2. Découvrir l'API Web Storage pour stocker des données localement dans le navigateur
3. Exploiter le format JSON pour stocker des données complexes JavaScript sous forme d'une chaîne de caractères
4. Renforcer les acquis de base : syntaxe des éléments du langage, conditions, boucles, fonctions, etc
5. structurer un code complexe en créant des fonctions dans plusieurs fichiers

## Fonctionnalités
Il s'agit de développer un carnet d'adresses permettant d'ajouter, de modifier ou de supprimer des contacts.
Il est bien sûr possible de visualiser les informations des contacts enregistrés.

### Ajouter un contact
Au clic sur le bouton "Nouveau contact", le formulaire apparaît, les champs sont vides.

Lors du clic sur le bouton "Enregistrer", les données du formulaire sont recueillies et le nouveau contact apparaît 
dans la liste des contact sur le côté gauche. Le formulaire disparaît. 

***Remarque*** : si un contact est sélectionné, au clic sur le bouton "Nouveau contact", il disparaît.

### Afficher le détail d'un contact
Au clic sur le nom d'un contact dans la liste des contacts, le bloc de détails du contact apparaît avec 
les informations du contact : nom, prénom, email et téléphone. 

Un seul contact peut être affiché à la fois. 

Lors du clic sur un contact, celui-ci est sélectionné dans la liste : il possède la classe 'selected'.

### Modifier un contact
Au clic sur le bouton "Modifier" du bloc de détails d'un contact, le formulaire apparaît.

Les champs du formulaire sont remplis avec les informations du contact. Le bloc de détails du contact reste affiché.

Lors du clic sur le bouton "Enregistrer" du formulaire, le contact est misà jour dans la liste de contacts et sur la fiche de détails.
Le formulaire disparaît mais le bloc de détails reste affiché et le contact sélectionné dans la liste.

### Supprimer un contact
Au clic sur le bouton "Supprimer" du bloc de détails d'un contact, le contact est supprimé, le bloc de détails disparaît et le contact 
disparaît également de la liste des contacts sur le côté gauche. 

## Démonstration
<a href="https://www.youtube.com/watch?v=bnF3pyvS5LE" target="_blank">Voir la démo</a>

## Ressources externes

* <a href="https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API" target="_blank">Web Storage API</a>
* <a href="https://www.alsacreations.com/article/lire/1675-json-stockage-leger-pratique-donnees-multitypes.html" target="_blank">Le format JSON</a>
* <a href="https://developer.mozilla.org/fr/docs/Learn/HTML/Howto/Use_data_attributes" target="_blank">Les attributs de données</a>

## Bonus
### Filtrer les contacts
Ajouter un champ de recherche au dessus de la liste des contacts.

Lorsque l'utilisateur commence à écrire le nom d'un contact, une recherche est effectuée dans la liste des contacts,
et les contacts affichés sont automatiquement mis à jour en fonction de la recherche. 

### Modules
Utiliser les modules pour charger les différentes fonctions utilisées, plutôt que d'ajouter chaque fichier JavaScript dans le code HTML.

### Classes
Découper le code en fonction a ses limites, créer des classes est beaucoup plus puissant !