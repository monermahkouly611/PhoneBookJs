const contacts = [
    { id: 1, name: 'Joker', phone: '999999999', img: 'https://cdn0.iconfinder.com/data/icons/famous-character-vol-2-colored/48/JD-39-512.png' },
    { id: 2, name: 'Harley Quinn', phone: '234-567-8901', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/suicide_squad_woman_avatar_joker-256.png' },
    { id: 3, name: 'Batman', phone: '345-678-9012', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png' },
    { id: 4, name: 'Mother Teresa', phone: '456-789-0123', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/nun_sister_woman_avatar-512.png' }
];
let editContactId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
});

function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact';
        li.innerHTML = `
            <img src="${contact.img}" alt="${contact.name}" class="contact-img">
            <div class="contact-info">
                <h2>${contact.name}</h2>
            </div>
            <div class="contact-actions">
                <i class="fas fa-info-circle" onclick="showInfo(${contact.id})"></i>
                <i class="fas fa-edit" onclick="editContact(${contact.id})"></i>
                <i class="fas fa-trash-alt" onclick="confirmDelete(${contact.id})"></i>
            </div>
        `;
        contactList.appendChild(li);
    });
    document.getElementById('people-count').innerText = `${contacts.length} people`;
}

function showInfo(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        document.getElementById('contact-info').innerText = `Name: ${contact.name}`;
        openPopup('info-popup');
    }
}

function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('image-url').value = contact.img;
        editContactId = id;
        openPopup('add-edit-popup');
    }
}

function saveContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const img = document.getElementById('image-url').value;
    if (editContactId) {
        const contact = contacts.find(c => c.id === editContactId);
        contact.name = name;
        contact.phone = phone;
        contact.img = img;
        editContactId = null;
    } else {
        const newContact = { id: Date.now(), name, phone, img };
        contacts.push(newContact);
    }
    renderContacts();
    closePopup('add-edit-popup');
    document.getElementById('contact-form').reset();
}

function confirmDelete(id) {
    openPopup('delete-popup');
    document.getElementById('confirm-delete-btn').onclick = () => {
        deleteContact(id);
    };
}

function deleteContact(id) {
    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex > -1) {
        contacts.splice(contactIndex, 1);
        renderContacts();
        closePopup('delete-popup');
    }
}

function searchContacts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    filteredContacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact';
        li.innerHTML = `
            <img src="${contact.img}" alt="${contact.name}" class="contact-img">
            <div class="contact-info">
                <h2>${contact.name}</h2>
            </div>
            <div class="contact-actions">
                <i class="fas fa-info-circle" onclick="showInfo(${contact.id})"></i>
                <i class="fas fa-edit" onclick="editContact(${contact.id})"></i>
                <i class="fas fa-trash-alt" onclick="confirmDelete(${contact.id})"></i>
            </div>
        `;
        contactList.appendChild(li);
    });
    document.getElementById('people-count').innerText = `${filteredContacts.length} people`;
}
