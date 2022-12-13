# Slider
## Contexte
Les sliders ou carrousels d'images sont parfois décriés. Pour autant ce sont des éléments qu'on retrouve très souvent sur un site web
et c'est un cas d'école pour tout développeur. Il existe bien sûr des sliders "prêts-à-slider", notamment grâce aux plugins jQuery, mais on va voir ici que ce n'est pas si compliqué à faire soi-même.
Vive le DIY! :)

## Objectifs pédagogiques
Cet exercice va permettre de revoir et d'approfondir la manipulation du DOM en JavaScript :

- ***Sélection*** des éléments du DOM
- Gestion des classes avec l'***API classList***
- Gestion des ***événements*** liés à la ***souris***
- Gestion des ***événements*** liés au ***clavier***
- Evénément '***DOMContentLoaded***'
- ***Création d'éléments*** "from scratch" et ***insertion*** dans le document
- Manipulation des ***attributs*** HTML des éléments du DOM
- Stockage de données directement dans les balises HTML grâce aux ***attributs data*** et à l'***API dataset***

## Fonctionnalités
L'objectif du projet est de mettre en place un slider d'images.
Plusieurs boutons permettent d'agir sur le slider :

- Bouton "Image suivante" : affiche la prochaine image
- Bouton "Image précédente" : affiche l'image précédente
- Bouton "Play/Pause" : lancer / stoppe le défilement automatique des images
- Bouton "Random" : affiche une image au hasard, différente de l'image actuelle

En plus de ces boutons, le slider devra être navigable au clavier :

- touche -> (flèche droite) : affiche la prochaine image
- touche <- (flèche gauche) : affiche l'image précédente
- touche (espace) : play/pause

### Puces
- Ajouter des puces rondes cliquables sous le diaporama permettra d'accéder immédiatement à l'image souhaitée, de visualiser l'image active et de voir le nombre total d'images. Nous construirons ces puces de manière dynamique en JavaScript. 
- Au clic sur une puce, l'image correspondante apparaît.
- Lorsque l'image affichée change, par exemple si on clique sur les boutons "Prédécent" ou "Suivant", l'item sélectionné est mis à jour.
- Les items de la liste seront stylés de manière à apparaître sur la figure.

La difficulté ici sera d'installer un gestionnaire d'événement sur des éléments qui n'existent pas au départ... ce sera l'occasion d'appréhender la ***délégation d'événement***.

## Indications
### Principe général
Toutes les images du slider seront présentes dès le départ dans le code source HTML. La balise ***figure*** semble ici adéquate.
En CSS il sera aisé de masquer les figures, sauf une, qui sera visible, au moyen d'une classe 'active'.

Changer l'image affichée signifie donc attribuer la classe 'active' à une autre figure... 

Pour les puces, insérer une liste numérotée avec l'id ***slider-dots*** et la classe ***slider-dots*** dans le code HTML.

### Mise en place des éléments HTML

* Créer une barre de navigation (*class : toolbar*) pour la barre d'outils

La barre d'outils est une liste de boutons :

* Un bouton (*id : play-pause*) pour démarrer ou arrêter le carrousel.
* Un bouton (*id : random*) pour se déplacer aléatoirement dans le diaporama.

Dans la partie principale de la page :

* Créer une figure par photos (*class : slider-figure*)
* Insérer une balise img (*class : slider-picture*)
* Insérer une légende (*class : slider-legend*)
* Créer une navigation (*class : slider-navigation*)  intégrant 2 liens (*id : prev* / *class : prev*) (*id : next* / *class : next*)  permettant de naviguer vers la gauche ou vers la droite (flèches)

### CSS

Au chargement de la page :

* Toutes les figures doivent être masquées, sauf la première à l'aide d'une classe (*class : active*)
* Les légendes doivent apparaître sur les photos suffisamment lisibles
* Les flèches de navigation doivent être placées de part et d'autre de la photo

### JavaScript

* Nommer correctement les gestionnaires d'évènements pour qu'ils aient un sens.
* On veillera à utiliser le moins de variables globales possibles !

## Mockup
![Capture](.resources/img/capture-1.png)
