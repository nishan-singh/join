let contacts = [];
let deleteContacts = [];
let alphabetics = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "M",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let modal = document.querySelector("#new-contact");

setURL("https://join.nishan-singh.com/smallest_backend_ever");

async function initContacts() {
  await downloadFromServer();
  await loadContacts();
  await includeHTML();
  renderContacts();
  sidebarLinkActive();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function createContact() {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");

  // let modal = document.getElementById("new-contact")
  // .classList.remove("show-overlay-menu");

  contacts.push({
    "first-name": firstName.value,
    "last-name": lastName.value,
    email: email.value,
    phone: phone.value,
    color: getRandomColor(),
    id: new Date().getTime(),
  });
  saveUsers();
  renderContacts();
  deleteValue(firstName, lastName, email, phone);
  closeOverlay();
}

function deleteContact(i) {
  const contact = contacts[i];
  document.getElementById("contact-data").innerHTML = "";
  deleteContacts.push(contact);
  contacts.splice(i, 1);
  renderContacts();
  saveUsers();
}

function renderContacts() {
  let content = document.getElementById("contacts");
  content.innerHTML = "";
  for (let index = 0; index < alphabetics.length; index++) {
    content.innerHTML += listTemplate(index);
  }
  for (let i = 0; i < contacts.length; i++) {
    let alphabet = contacts[i]["first-name"].charAt(0).toUpperCase();
    let alphabetContainer = document.getElementById(`${alphabet}-Contianer`);
    let contactContainer = document.getElementById(`${alphabet}`);
    contactRegister(alphabet, i, alphabetContainer, contactContainer);
  }
}

function contactRegister(alphabet, i, alphabetContainer, contactContainer) {
  for (let j = 0; j < alphabetics.length; j++) {
    if (alphabetics[j] === alphabet) {
      alphabetContainer.innerHTML += contactListHTML(contacts[i], i);
      contactContainer.style.display = "initial";
      document.getElementById(
        `letterbox-contact-div${i}`
      ).style.backgroundColor = contacts[i]["color"];
    }
  }
}

function sortAlphabetic() {
  contacts.sort((a, b) => {
    let fa = a["first-name"].toLowerCase(),
      fb = b["first-name"].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
}

function openContactData(i) {
  const contactdata = contacts[i];
  document.getElementById("contact-data").innerHTML = contactDataHTML(
    contactdata,
    i
  );
  document.getElementById(
    `contact-first-last-name-div${i}`
  ).style.backgroundColor = contacts[i]["color"];
  if (window.innerWidth < 700) {
    document.getElementById("contacts-wrapper").style.display = "none";
    document.getElementById("contacts-div-box").style.display = "flex";
    document.getElementById("new-contact-button").style.display = "none";
  }
}

function closeContact() {
  if (window.innerWidth < 700) {
    document.getElementById("contacts-wrapper").style.display = "flex";
    document.getElementById("contacts-div-box").style.display = "none";
    document.getElementById("new-contact-button").style.display = "flex";
  }
}

window.addEventListener("resize", () => {
  closeContact();
  if (window.innerWidth > 700) {
    document.getElementById("contacts-wrapper").style.display = "flex";
    document.getElementById("contacts-div-box").style.display = "flex";
    document.getElementById("new-contact-button").style.display = "flex";
  }
});

function openEditContact(i) {
  let editModel = document.getElementById(`edit-contact`);
  editModel.showModal();
  editModel.classList.add("edit-contact");
  const editcontactdata = contacts[i];
  document.getElementById("edit-contact").innerHTML = editContactDataHTML(
    editcontactdata,
    i
  );
  document.getElementById(`edit-name-token${i}`).style.backgroundColor =
    contacts[i]["color"];
}

function editSave(i) {
  let firstName = document.getElementById(`edit-first-name${i}`);
  let lastName = document.getElementById(`edit-last-name${i}`);
  let email = document.getElementById(`edit-email${i}`);
  let phone = document.getElementById(`edit-phone${i}`);

  contacts[i]["first-name"] = firstName.value;
  contacts[i]["last-name"] = lastName.value;
  contacts[i]["email"] = email.value;
  contacts[i]["phone"] = phone.value;

  closeEdit();
  renderContacts();
  saveUsers();
  openContactData(i);
}

function closeEdit() {
  let editModel = document.getElementById(`edit-contact`);
  editModel.classList.remove("edit-contact");
  editModel.close();
}

function closedOverlay() {
  document.getElementById("overlay-contact").innerHTML = "";
}

function deleteValue(firstName, lastName, email, phone) {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  phone.value = "";
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * this function save contacts to the backend
 *
 */
async function saveUsers() {
  await backend.setItem("contact", JSON.stringify(contacts));
}

/**
 * this function load contacts from the backend
 *
 */
async function loadContacts() {
  contacts = JSON.parse(backend.getItem("contact")) || [];
}

function contactListHTML(contact, i) {
  return `
        <div class="contacts" id="contactss${i}">
        <div class="letterbox" id="letterbox${i}" onclick="openContactData(${i});">
        <div class="latterbox-contact-div" id="letterbox-contact-div${i}">
        ${contact["first-name"].charAt(0)}${contact["last-name"].charAt(0)}
        </div>
        <div class="openContact">
        <span class="contactlist-name">
        ${contact["first-name"]}
        ${contact["last-name"]}
        </span>
        <a class="contactlist-email">
        ${contact["email"]}
        </a>
        </div>
        </div>
        </div>
        `;
}

function listTemplate(index) {
  return `
        <div id="${alphabetics[index]}" class="each-letter-contacts-block" style="display: none">
        <h2 class="contactHeadline">${alphabetics[index]}</h2>
        <div class="contacts-div-line"></div>
        <div id="${alphabetics[index]}-Contianer"></div>
       </div>
       `;
}

function contactDataHTML(contactdata, i) {
  let firstNLastLetter =
    contactdata["first-name"].charAt(0) + contactdata["last-name"].charAt(0);
  let fullName = contactdata["first-name"] + " " + contactdata["last-name"];

  return `
        <div class="contactdata"> 
            <div class="contact-name">
            <div class="contact-first-last-name-div" id="contact-first-last-name-div${i}">
                ${firstNLastLetter}
                </div>
                <div class="add-task-div">
                <span class="contact-data-name">
                ${fullName}
                </span>
                    <a href="../board/add-task.html"  class="add-task">
                    <img class="add-task-img" src="../img/Group 11.png">
                    Add Task</a>
                </div>
            </div>
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <button class="edit-contact-button" onclick="openEditContact(${i})">
                        <img class="edit-contact-img" src="../img/Group 8.png">
                        <span class="edit-name">Edit Contact</span>
                        </button>
                        <img src="../img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contactdata["email"]}" class="contact-data-email">${contactdata["email"]}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contactdata["phone"]}" class="contact-data-phone">${contactdata["phone"]}</a>
                    </div> 
        </div>
    `;
}

function contactDataOverlayHTML(contacoverlaytdata, i) {
  return `
    <div class="overlay-background-color">
    <img src="../img/Vector1.png" class="overlay-back" onclick="closedOverlay(${i})">
    <div class="contacts-div-box-name">
                <h3 class="contacts-name">Contacts</h3>
                <img class="contacts-name-img" src="../img/Vector 5.png">
                <h4 class="better-with">Better with a team</h4>
                <img class="contact-name-img" src="../img/Vector5.png">
            </div>
        <div class="overlay-contactdata"> 
            <div class="contact-first-last-name-div" id="contact-overlay-first-last-name-div${i}">
                    ${contacoverlaytdata["first-name"].charAt(0)}
                    ${contacoverlaytdata["last-name"].charAt(0)}
            </div>
                <span class="contact-data-name">
                    ${contacoverlaytdata["first-name"]}
                    ${contacoverlaytdata["last-name"]}
                </span>
                <div class="add-task-div">
                    <a href="../board/add-task.html"  class="add-task">
                    <img class="add-task-img" src="../img/Group 11.png">
                    Add Task</a>
                </div>
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <div class="edit-contact-button" onclick="openEditContact(${i})">
                        <img class="edit-contact-img" src="../img/Group 8.png">
                        <div class="edit-img-white">
                        <div class="edit-contact-img-white">
                            <img src="../img/Group8.png">
                        </div>
                        </div>
                        <span class="edit-name">Edit Contact</span>
                        </div>
                        <img src="../img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${
                          contacoverlaytdata["email"]
                        }" class="contact-data-email">${
    contacoverlaytdata["email"]
  }</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${
                          contacoverlaytdata["phone"]
                        }" class="contact-data-phone">${
    contacoverlaytdata["phone"]
  }</a>
                    </div> 
        </div>
    </div>
    `;
}

function editContactDataHTML(editcontactdata, i) {
  return `
  <button onclick="closeEdit()" class="close-x">    
  <svg
  width="31"
  height="31"
  viewBox="0 0 31 31"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M22.9616 7.65393L7.65388 22.9617"
    stroke="#2A3647"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M22.8172 23.1061L7.50941 7.79838"
    stroke="#2A3647"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg></button>
  <div class="edit-box-left">
  <h2 class="edit-contact-name">Edit contact</h2>
  </div>
  <div class="edit-name-token" >
  <div id="edit-name-token${i}">
  ${editcontactdata["first-name"].charAt(0)}${editcontactdata[
    "last-name"
  ].charAt(0)}
  </div>
  </div>
  <div class="edit-input-field" id="edit-input-field">
            <form class="edit-input-div" onsubmit="editSave(${i}); return false">
                <input required type="text" class="edit-input" id="edit-first-name${i}" value="${
    editcontactdata["first-name"]
  }" placeholder="First-Name">
                <input required type="text" class="edit-input" id="edit-last-name${i}" value="${
    editcontactdata["last-name"]
  }" placeholder="Last-Name">
                <input required type="email" class="edit-input" id="edit-email${i}" value="${
    editcontactdata["email"]
  }" placeholder="Email">
                <input type="number" inputmode="numeric" required class="edit-input" id="edit-phone${i}" value="${
    editcontactdata["phone"]
  }" placeholder="Phone">
  <button class="edit-save" id="edit-save">
  <h3 class="edit-save-button">Save</h3>
  </button>
  </form>
    </div>
    `;
}

const numericInputs = document.querySelectorAll("[inputmode='numeric']");

numericInputs.forEach((input) => {
  validateInput(input);
});

function validateInput(el) {
  el.addEventListener("beforeinput", function (e) {
    let beforeValue = el.value;
    e.target.addEventListener(
      "input",
      function () {
        if (el.validity.patternMismatch) {
          el.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}
