'use strict';

/**
 * Génère un entier aléatoire entre 2 bornes
 * @param min - Borne minimale
 * @param max - Borne maximale
 * @returns {number} - L'entier aléatoire
 */
function getRandomInteger(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
* INSTALLER UN GESTIONNAIRE D'EVENEMENT
*   sur un élément HTML dont le sélecteur est : selector
*   pour l'événement : type
*   qui exécute la fonction : eventHandler
*
*   Exemple d'exécution :
*   installEventHandler('#next','click', onSliderGoToNext );
*
*   cible l'élément dont id="next"
*   installe un gestionnaire d'événement au click
*   pour éxécuter la fonction onSliderGoToNext
*
* @param {string} selector : sélecteur css
* @param {string} type : type d'événement
* @param {fonction} eventHandler : fonction exécutée
*/
function installEventHandler(selector,type,eventHandler)
{
  // Récupération du premier objet DOM correspondant au sélecteur.
  const domObject = document.querySelector(selector);

  // Installation d'un gestionnaire d'évènement sur cet objet DOM.
  domObject.addEventListener(type, eventHandler);

}