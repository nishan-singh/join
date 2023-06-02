let loadedContacts = [];
let users = [];

setURL("https://join.nishan-singh.com/smallest_backend_ever");

/**
 *function to wait some time before moving logo and getting login-box
 */
async function getLogin() {
  setTimeout(moveLogo, 500);
  await downloadFromServer();
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
  setTimeout(removeStartBackground, 100);
}

/**
 * function to hide the start-background by adding class d-none
 */
function removeStartBackground() {
  document.getElementById("start-background").classList.add("d-none");
}

/**
 * function to change background-opacity bei class-change
 */
function backgroundOpacity() {
  let bg = document.getElementById("start-background");
  bg.classList.remove("start");
}

/**
 * function for showing the login-box and sign-in
 */
function showLogin() {
  document.getElementById("login-container").classList.remove("d-none");
  document.getElementById("new-user-container").classList.remove("d-none");
}

async function getCurrentUserFromBackend() {
  let usersFromBackend = (await JSON.parse(backend.getItem("users"))) || [];
  let logInEmail = document.getElementById("mail-login");
  let logInPassword = document.getElementById("password-login");
  let current_user = usersFromBackend.find((u) => u.email == logInEmail.value);
  checkUser(current_user, logInPassword, usersFromBackend);
}

async function checkUser(current_user, logInPassword, users) {
  if (current_user) {
    document
      .getElementById("not-registered")
      .classList.add("visibility-hidden");
    let foundUser = users.find((u) => u.password == logInPassword.value);
    if (foundUser) {
      await backend.setItem("greet_user", JSON.stringify(current_user));
      getDemoSummary();
    } else {
      showForgotPasswordInfo();
    }
  } else {
    showRegistrationInfo();
  }
}

/**function to reset value of login fields */
function resetLogin() {
  document.getElementById("email-login").value = "";
  document.getElementById("password-login").value = "";
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
  await backend.setItem("greet_user", JSON.stringify(guest_user));
  getDemoSummary();
}

/**
 * function to get the summary as guest
 */
function getDemoSummary() {
  window.location.href = "../summary/homepage.html";
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

/**function to count Trys of Login */
function showForgotPasswordInfo() {
  document.getElementById("password-login").value = "";
  document
    .getElementById("forgot-password")
    .classList.remove("visibility-hidden");
}

/**
 * functions to give warning about trys
 */
function showRegistrationInfo() {
  document
    .getElementById("not-registered")
    .classList.remove("visibility-hidden");
}

function cleanLogin(id1, id2, id3 = "") {
  document.getElementById(id1).value = "";
  document.getElementById(id2).value = "";
  if (id3) {
    document.getElementById(id3).value = "";
  }
}

function cleanPassword() {
  document.getElementById("password-login").value = "";
  let info = document.getElementById("new-password");
  info.innerHTML = "Forgot Password";
  info.style.color = "rgb(40, 171, 226)";
  info.onclick = onclickReaction(true);
}
