let loadedContacts = [];
let users = [];

setURL("https://nishan-singh.developerakademie.net/join/smallest_backend_ever");

/**
 *function to wait some time before moving logo and getting login-box
 */
async function getLogin() {
  setTimeout(moveLogo, 500);
  await downloadFromServer();
  // let newUser = JSON.parse(backend.getItem("users")) || [];
}

/**
 *function for moving the start-logo from center to left corner
 */
function moveLogo() {
  let logo = document.getElementById("start-pic");
  backgroundOpacity();
  logo.classList.remove("logo-big");
  logo.classList.add("logo-small");
  showLogin();
  setTimeout(removeStartbackground, 100);
}

/**
 * function for undisplay the startbackground by adding class
 */
function removeStartbackground() {
  document.getElementById("start-background").classList.add("d-none");
}

/**
 * function to change background-opacity bei class-change
 */
function backgroundOpacity() {
  let bg = document.getElementById("start-background");
  bg.classList.remove("start");
  bg.classList.add("stop");
}


/**
 * funtion to set Location of Storage
 */

/**
 * function for showing the login-box and sign-in
 */
function showLogin() {
  document.getElementById("login-container").classList.remove("d-none");
  document.getElementById("newuser-container").classList.remove("d-none");
}

async function getCurrentUserFromBackend() {
  let usersFromBackend = (await JSON.parse(backend.getItem("users"))) || [];
  let logEmail = document.getElementById("mail-login");
  let logpassword = document.getElementById("password-login");
  let current_user = usersFromBackend.find((u) => u.email == logEmail.value);
  checkUser(current_user, logpassword, usersFromBackend);
}

async function checkUser(current_user, logpassword, users) {
  if (current_user) {
    let foundUser = users.find((u) => u.password == logpassword.value);
    if (foundUser) {
      await backend.setItem("greet_user", JSON.stringify(current_user));
      setCurrentUserToLocal(foundUser);
      window.location.href = "../summary/homepage.html";
    } else {
      tryOneMore(users, current_user);
    }
  } else {
    openInfoTrys();
  }
}

async function getUsers() {
  // console.log(newUser);
}

/**function to reset value of loginfields */
function resetLogin() {
  document.getElementById("email-login").value = "";
  document.getElementById("password-login").value = "";
}

/**
 * function to storage current User local
 */

function setCurrentUserToLocal(currentUser) {
  let currentUserAsText = JSON.stringify(currentUser);
  localStorage.setItem("guest_user", currentUserAsText);
  // console.log(currentUser["name"]);
}

/**
 * function to login a guestUser
 */
async function guestLogin() {
  let guest_user = {
    name: "Guest",
    email: "guest@guest.de",
    color: "grey",
  };
  await backend.deleteItem("greet_user");
  setCurrentUserToLocal(guest_user);
  getDemoSummary();
  await backend.setItem("greet_user", JSON.stringify(guest_user));
}

/**
 * function to get the summary as guest
 */
function getDemoSummary() {
  window.location.href = "../summary/homepage.html";
}

/**
 * function to set a new user to local store
 * @param {string} newUser -Parameter is name of user,who wants to registrate
 */
function setJustRegistratedToSessStore(newUser) {
  sessionStorage.setItem("just_reg_email", newUser["email"]);
  sessionStorage.setItem("just_reg_pw", newUser["password"]);
}

function removeJustRegistrated() {
  sessionStorage.removeItem("just_reg_email");
  sessionStorage.removeItem("just_reg_pw");
}

function getJustRegistratedEmail() {
  let email = sessionStorage.getItem("just_reg_email");
  return email;
}

function getJustRegistratedPW() {
  let pw = sessionStorage.getItem("just_reg_pw");
  return pw;
}

/**
 *function to change classname of popup
 */
function popupPassChange() {
  let popup = document.getElementById("popup-pw");
  popup.classList.remove("d-none");
  setTimeout(changeClass2, 100);
}

/**
 *function to change classname of popup
 */
function changeClass2() {
  let popup_p = document.getElementById("popup-pw-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(locateToLogin, 3000);
}

/**
 *function to change classname of popup
 */
function changeClass() {
  let popup_p = document.getElementById("popup-mail-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(newPassword, 3000);
}

/**
 * common functions
 */

/**functions to change window */
function locateToLogin() {
  window.location.href = "./login.html";
}

/**function to change window */
function locateToSignin() {
  window.location.href = "./registrieren.html";
}

function loginUser(users, email) {
  let loginUser;
  if (users.length == 0) {
    loginUser = true;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["email"] == email["email"]) {
        loginUser = false;
        return loginUser;
      } else {
        loginUser = true;
      }
    }
  }
  return loginUser;
}

/**function to count on session Storage*/
function getNumberOfTry() {
  let tryNumber = sessionStorage.getItem("trynumber");
  if (tryNumber) {
    return tryNumber;
  } else {
    return 0;
  }
}

/**function to count Trys of Login */
function tryOneMore(users, email) {
  if (loginUser(users, email)) {
    openInfoTrys();
  } else {
    window.location.href = "./forgot_password.html";
  }
}

/**
 * functions to give warning about trys
 */
function openInfoTrys() {
  let popup = document.getElementById("popup-trys");
  popup.classList.remove("d-none");
  setTimeout(locateToSignin, 1000);
}

function openInfoTrysOneMore() {
  let popup = document.getElementById("popup-try-again");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin, 1000);
}

function cleanLogin(id1, id2, id3 = "") {
  document.getElementById(id1).value = "";
  document.getElementById(id2).value = "";
  if (id3) {
    document.getElementById(id3).value = "";
  }
}

function renderValueLogin() {
  let name = getRememberName();
  let pw = getRememberPW();
  if (name && isNoValue()) {
    document.getElementById("mail-login").value = name;
    document.getElementById("password-login").value = pw;
  }
}

function isNoValue() {
  if (
    document.getElementById("mail-login").value == "" ||
    document.getElementById("password-login").value == ""
  ) {
    return true;
  }
}

function passwordWrong() {
  let info = document.getElementById("new-password");
  info.innerHTML = "Passwort falsch";
  info.style.color = "red";
  info.onclick = onclickReaction(false);
  setTimeout(cleanPassword, 1000);
}

function cleanPassword() {
  document.getElementById("password-login").value = "";
  let info = document.getElementById("new-password");
  info.innerHTML = "Passwort vergessen";
  info.style.color = "rgb(40, 171, 226)";
  info.onclick = onclickReaction(true);
}

function onclickReaction(react) {
  return react;
}
