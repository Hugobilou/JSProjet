//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// IMPORT DE MODULE /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// FONCTIONS ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function refreshContactList(){
    let list = document.getElementById('contact-list');
    document.getElementById('contact-list').innerHTML = '';
    search = document.getElementById('contact-search').value;
    for (let i = 0; i < window.localStorage.length; i++){
        let li = document.createElement('li');
        let contactListFull = window.localStorage.getItem(i);
        let contactList = contactListFull.split(' ');
        li.classList.add('contact');
        li.dataset.index = i;
        li.innerHTML = `<a><i class="fa-solid fa-user"></i> ${contactList[0]} ${contactList[1]}</a>`;
        if (search == '' || contactListFull.includes(search)) list.appendChild(li);
    }
}

function onClickAddContact(event, index = -1){
    document.querySelector('#contact-form').classList.remove('hidden');
    if (index >= 0){
        let contactList = window.localStorage.getItem(index).split(' ');
        document.getElementsByName('firstname')[0].value = contactList[0];
        document.getElementsByName('lastname')[0].value = contactList[1];
        document.getElementsByName('phone')[0].value = contactList[2];
        document.getElementsByName('email')[0].value = contactList[3];
        document.getElementById('contact-form').dataset.index = index;
    }
    else{
        document.getElementById('contact-form').dataset.index = -1;
        document.getElementsByName('firstname')[0].value = '';
        document.getElementsByName('lastname')[0].value = '';
        document.getElementsByName('phone')[0].value = '';
        document.getElementsByName('email')[0].value = '';
        document.querySelector('#contact-details').classList.add('hidden');
        if (document.querySelector('a.selected') != null )document.querySelector('a.selected').classList.remove('selected');
    }
}

function onClickSaveContact(){
    let contact = "";
    contact += document.getElementsByName('firstname')[0].value;
    contact += ' ' + document.getElementsByName('lastname')[0].value;
    contact += ' ' + document.getElementsByName('phone')[0].value;
    contact += ' ' + document.getElementsByName('email')[0].value;
    
    let index = document.getElementById('contact-form').dataset.index;
    if (index >= 0){
        window.localStorage.setItem(index, contact);
        let li = document.querySelector(`li[data-index="${index}"]`);
        onClickContact('', li);
    }
    else window.localStorage.setItem(window.localStorage.length, contact);
    document.querySelector('#contact-form').classList.add('hidden');
    refreshContactList();
}

function onClickContact(event, target = event.target){
    document.querySelector('#contact-form').classList.add('hidden');
    if (target.tagName == 'I') target = target.parentElement;
    if (target.tagName == 'A') target = target.parentElement;
    if (target.tagName == 'LI'){
        let contactList = window.localStorage.getItem(target.dataset.index).split(' ');
        if (document.querySelector('a.selected') != null )document.querySelector('a.selected').classList.remove('selected');
        target.children[0].classList.add('selected');
        document.getElementById('contact-details').classList.remove('hidden');
        document.getElementById('contact-name').textContent = `${contactList[0]} ${contactList[1]}`;
        document.getElementById('contact-email').textContent = `${contactList[2]}`;
        document.getElementById('contact-phone').textContent = `${contactList[3]}`;
        document.getElementById('contact-details').dataset.index = target.dataset.index;
    }
}

function onClickEditContact(event){
    let index = document.getElementById('contact-details').dataset.index;
    onClickAddContact(event, index);
}

function onClickDeleteContact(){
    let index = document.getElementById('contact-details').dataset.index;
    window.localStorage.removeItem(index);
    document.querySelector('#contact-details').classList.add('hidden');
    document.querySelector('#contact-form').classList.add('hidden');
    refreshContactList();
}

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CODE PRINCIPAL ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Installation des gestionnaires d'évènements.
document.getElementById('add-contact').addEventListener('click', onClickAddContact);
document.getElementById('save-contact').addEventListener('click', onClickSaveContact);
document.getElementById('contact-list').addEventListener('click', onClickContact);
document.getElementById('contact-edit').addEventListener('click', onClickEditContact);
document.getElementById('contact-delete').addEventListener('click', onClickDeleteContact);
document.getElementById('contact-search').addEventListener('keyup', refreshContactList);

// Rafraîchissement de la liste des contacts sur la page HTML
refreshContactList();