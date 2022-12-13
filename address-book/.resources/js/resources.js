'use strict';

function insertTriggerResources() {
  const cible   = document.querySelector('#resources');
  if(cible !== null) {
    const trigger = document.createElement('button');
    //Support CSS
    const supportCSS = document.createElement('link');

    // Couleur du trigger
    const header = document.querySelector('body > header');
    const cssHeader = getComputedStyle(header);
    trigger.style.color = cssHeader.color;
    //console.log(cssHeader);

    trigger.setAttribute('role','button');
    trigger.classList.add('resources-toggle');
    trigger.setAttribute('title','Support pédagogique');
    trigger.setAttribute('aria-pressed','false');
    //trigger.textContent = '?';

    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      window.scroll(0,0);
      const pressed = this.getAttribute('aria-pressed') == 'true';
      trigger.setAttribute('title', pressed ? 'Support pédagogique' : 'Fermer');
      trigger.style.color = pressed ? cssHeader.color : '#000000';
      trigger.setAttribute('aria-pressed', pressed ? 'false' : 'true');
      //trigger.textContent = pressed ? '?' : 'x';
      cible.classList.toggle('is-open');
      setTimeout( function(){window.scroll(0,0), 500});
    });
    supportCSS.setAttribute('href','.resources/css/resources.css');
    supportCSS.setAttribute('rel','stylesheet');
    document.querySelector('head').appendChild(supportCSS);
    document.querySelector('body').appendChild(trigger);
  }
}

function insertMarkdownComponent() {

  const mdFile = document.querySelector('[data-md]').dataset.md;
  const supportComponent = document.createElement('zero-md');
  const script1 = document.createElement('script');
  const script2 = document.createElement('script');

  // Web-component
  script1.src = '.resources/js/webcomponents-loader.min.js';
  script2.src = '.resources/js/zero-md.min.js';
  script2.setAttribute('type','module');

  supportComponent.setAttribute('id','resources');
  supportComponent.classList.add('resources');
  supportComponent.setAttribute('src', mdFile);
  //supportComponent.setAttribute('manual-render','true');
  //supportComponent.setAttribute('css-urls','["./resources/css/markdown.css"]');

  // Insertion webComponent
  document.querySelector('body').appendChild(supportComponent);
  document.querySelector('body').appendChild(script1);
  document.querySelector('body').appendChild(script2);

  // Insertion trigger si traduction OK
  supportComponent.addEventListener('zero-md-rendered', function(){
    insertTriggerResources();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  insertMarkdownComponent();
});
