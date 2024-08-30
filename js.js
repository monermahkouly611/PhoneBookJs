
// Array of contact objects, each containing an id, name, phone number, and image URL
const contacts = [
    { id: 1, name: 'Joker', phone: '0546019717', img: 'https://cdn0.iconfinder.com/data/icons/famous-character-vol-2-colored/48/JD-39-512.png' },
    { id: 2, name: 'Harley Quinn', phone: '2345678901', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/suicide_squad_woman_avatar_joker-256.png' },
    { id: 3, name: 'Batman', phone: '3456789012', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png' },
    { id: 4, name: 'Mother Teresa', phone: '4567890123', img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/nun_sister_woman_avatar-512.png' }
];

// Variable to keep track of the contact being edited
let editContactId = null;

// Event listener that runs when the DOM is fully loaded, rendering the contacts
document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
});

// Function to open a popup by setting its display to 'flex'
function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
}

// Function to close a popup by setting its display to 'none'
function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

// Function to render all contacts in the contact list
function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ''; // Clear the current list

    // Sort contacts by name alphabetically (case-insensitive)
    contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    // Loop through each contact and create a list item (li)
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact'; // Add class for styling
        // Insert HTML for contact image, name, and action icons
        li.innerHTML = `
            <img src="${contact.img}" alt="${contact.name}" class="contact-img">
            <div class="contact-info">
                <h2>${contact.name}</h2>
            </div>
            <div class="contact-actions">
                <!-- Info, Edit, and Delete buttons with event handlers -->
                <i class="fas fa-info-circle" onclick="showInfo(${contact.id})"></i>
                <i class="fas fa-edit" onclick="editContact(${contact.id})"></i>
                <i class="fas fa-trash-alt" onclick="confirmDelete(${contact.id})"></i>
            </div>
        `;
        contactList.appendChild(li); // Append the contact to the list
    });

    // Update the contact count displayed on the page
    document.getElementById('people-count').innerText = `${contacts.length} people`;
}


// Function to show contact details in a popup when the info icon is clicked
function showInfo(id) {
    const contact = contacts.find(c => c.id === id); // Find the contact by id
    if (contact) {
        // Display the contact's name in the info popup and open the popup
        document.getElementById('contact-info').innerText = `Name: ${contact.name}`;
        openPopup('info-popup');
    }
}

// Function to populate the edit form with the selected contact's details
function editContact(id) {
    const contact = contacts.find(c => c.id === id); // Find the contact by id
    if (contact) {
        // Fill the form fields with the contact's current details
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('image-url').value = contact.img;
        editContactId = id; // Set the editContactId to track which contact is being edited
        openPopup('add-edit-popup'); // Open the add/edit popup
    }
}

// Function to save the new or edited contact
function saveContact(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value;
    const img = document.getElementById('image-url').value;

    // Phone number validation: must be exactly 10 digits
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return; // Prevent form submission if validation fails
    }

    // Check if the name already exists in the contacts array (case insensitive)
    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact && existingContact.id !== editContactId) {
        alert("A contact with this name already exists.");
        return; // Prevent form submission if a contact with the same name exists
    }

    if (editContactId) {
        // If editing, update the contact's details
        const contact = contacts.find(c => c.id === editContactId);
        contact.name = name;
        contact.phone = phone;
        contact.img = img;
        editContactId = null; // Clear the editContactId after saving
    } else {
        // If adding a new contact, create it with a unique id
        const newContact = { id: Date.now(), name, phone, img };
        contacts.push(newContact); // Add the new contact to the array
    }

    renderContacts(); // Re-render the updated contact list
    closePopup('add-edit-popup'); // Close the add/edit popup
    document.getElementById('contact-form').reset(); // Reset the form fields
}


// Function to confirm the deletion of a contact
function confirmDelete(id) {
    openPopup('delete-popup'); // Open the delete confirmation popup
    document.getElementById('confirm-delete-btn').onclick = () => {
        deleteContact(id); // Call deleteContact() when the delete button is clicked
    };
}

// Function to delete a contact by id
function deleteContact(id) {
    const contactIndex = contacts.findIndex(c => c.id === id); // Find the index of the contact
    if (contactIndex > -1) {
        contacts.splice(contactIndex, 1); // Remove the contact from the array
        renderContacts(); // Re-render the updated contact list
        closePopup('delete-popup'); // Close the delete confirmation popup
    }
}

// Function to filter the contact list based on the user's search input
function searchContacts() {
    const query = document.getElementById('search-input').value.toLowerCase(); // Get the search query
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query)); // Filter contacts by name
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ''; // Clear the current list
    // Render the filtered contacts
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
        contactList.appendChild(li); // Append the filtered contacts to the list
    });
    // Update the contact count with the filtered results
    document.getElementById('people-count').innerText = `${filteredContacts.length} people`;
}
// Function to delete all contacts with confirmation alert
function deleteAllContacts() {
    // Show a confirmation dialog
    const confirmation = confirm("Are you sure you want to delete all contacts?");
    
    // If the user confirms, delete all contacts
    if (confirmation) {
        contacts.length = 0; // Clears the contacts array
        renderContacts(); // Re-render the contact list to reflect the changes
        alert("All contacts have been deleted."); // Notify the user
    }
}


function showInfo(id) {
    const contact = contacts.find(c => c.id === id); // Find the contact by id
    if (contact) {
        // Display the contact's name and phone number in the info popup
        document.getElementById('contact-info').innerHTML = `
            <strong>Name:</strong> ${contact.name}<br>
            <strong>Phone Number:</strong> ${contact.phone}`;
        openPopup('info-popup');
    }
}



// Function to delete all contacts
function deleteAllContacts() {
    // Show a confirmation dialog
    const confirmation = confirm("Are you sure you want to delete all contacts?");
    
    // If the user confirms, delete all contacts
    if (confirmation) {
        contacts.length = 0; // Clears the contacts array
        renderContacts(); // Re-render the contact list to reflect the changes
        alert("All contacts have been deleted."); // Notify the user
    }
}










