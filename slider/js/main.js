'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

let idInter;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

function next(event, nbr = Number(document.querySelector('.active').children[0].src.match(/[1-9]/))){
    if (document.querySelectorAll('.slider-figure').length > nbr){
        document.querySelector('.active').classList.remove('active');
        document.querySelector('li.active').classList.remove('active');
        document.querySelectorAll('.slider-figure')[nbr].classList.add('active');
        document.querySelectorAll('.slider-dots li')[nbr].classList.add('active');
    }
}

function prev(event, nbr = Number(document.querySelector('.active').children[0].src.match(/[1-9]/))){
    if (nbr > 1){
        document.querySelector('.active').classList.remove('active');
        document.querySelector('li.active').classList.remove('active');
        document.querySelectorAll('.slider-figure')[nbr-2].classList.add('active');
        document.querySelectorAll('.slider-dots li')[nbr-2].classList.add('active');
    }
}

function play(){
    if (document.querySelector('#play-pause').className.match('on') == null){
        document.querySelector('#play-pause').classList.add('on');
        idInter = setInterval(function(){
            next();
        }, 3000)
    }
    else{
        document.querySelector('#play-pause').classList.remove('on');
        clearInterval(idInter);
    }
}

function random(){
    let active = document.querySelector('.active');
    let nbr = Number(active.children[0].src.match(/[1-9]/));
    let rand;
    do{
        rand = Math.floor(Math.random() * (document.querySelectorAll('.slider-figure').length) + 1);
    }while (rand == nbr)
    active.classList.remove('active');
    document.querySelectorAll('.slider-figure')[rand-1].classList.add('active');
}

function puce(){
    let puce = document.createElement('ul');
    let figure = document.querySelectorAll('.slider-figure');
    puce.classList.add('slider-dots');
    for (let i = 0; i < figure.length; i++){
        let puceImg = document.createElement('li');
        puceImg.dataset.img = `${figure[i].children[0].src}`
        puceImg.innerHTML = '<div></div>';
        if (figure[i].className.match('active') == 'active') puceImg.classList.add('active');
        puce.insertAdjacentElement('beforeend',puceImg);
    }
    document.querySelector('.slider-layout').insertAdjacentElement('beforeend', puce);
}

function dotsClick(event){
    if (event.target.tagName == 'LI'){
        let src = event.target.getAttribute('data-img');
        let nbr = Number(src.match(/[1-9]/))-1;
        next(event, nbr);
    }
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

/**
 * Code principal : code JavaScript exécuté dès le chargement de la page
 *
 * Pour s'assurer que le DOM est chargé (puisqu'on va le manipuler), on écoute l'événement 'DOMContentLoaded'
 * sur le document entier. Cet événement est lancé lorsque le navigateur a terminé de constuire le DOM.
 *
 * https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded
 *
 * On utilise en général comme fonction gestionnaire d'événement associée une fonction anonyme car
 * on ne l'appellera jamais ailleurs nous-même.
*/

document.addEventListener('DOMContentLoaded', function(){
    puce();

    document.querySelector('#next').onclick = next;
    document.querySelector('#prev').onclick = prev;
    document.querySelector('#play-pause').onclick = play;
    document.querySelector('#random').onclick = random;

    document.onkeydown = function(event){
        if (event.key == 'ArrowRight') next();
        else if (event.key == 'ArrowLeft') prev();
        else if (event.key == ' ') play();
    };

    document.querySelector('.slider-dots').onclick = dotsClick;
})