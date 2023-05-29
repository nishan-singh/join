setURL(
  "https://gruppenarbeit-join-454.developerakademie.net/smallest_backend_ever"
);

/**
 * function to get all registrated Users and Contacts from storage
 */

async function getUsers() {
  await downloadFromServer();
}

/**
 * function to registrate as new User
 */
async function sign() {
  let users = (await JSON.parse(backend.getItem("users"))) || [];
  let name = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  if (checknewUser(users, newUser)) {
    savenewUser(users, newUser);
    window.location.href = "./login.html";
    cleanValue(username, email, password);
  } else {
    openPopup();
  }
}

function openPopup() {
  let popup = document.getElementById("popup-user");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin, 2000);
}

function locateToLogin() {
  window.location.href = "./login.html";
}

function cleanValue(username, email, password) {
  username = "";
  email = "";
  password = "";
}
/**
 * function checks if user, who wants to registrate, is new
 * @param {string} newUser -Parameter is name of user,who wants to registrate
 * @returns {boolean} -true if user is new
 */
function checknewUser(users, newUser) {
  if (users.length == 0) {
    return;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (newUser["email"] == users[i]["email"]) {
        return false;
      } else {
        return true;
      }
    }
  }
}

/**
 * functions to save users to backend from here
 */

async function savenewUser(users, newUser) {
  users.push(newUser);
  await backend.setItem("users", JSON.stringify(users));
}
