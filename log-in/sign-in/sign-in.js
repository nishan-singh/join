setURL("https://join.nishan-singh.com/smallest_backend_ever");

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

  if (checkNewUser(users, email.value)) {
    saveNewUser(users, newUser);
    setTimeout(() => {
      window.location.href = "../login.html";
    }, 1000);
    cleanValue(username, email, password);
  } else {
    showWarning();
  }
}

function showWarning() {
  document.getElementById("user-exists").classList.remove("d-none");
}

function locateToLogin() {
  window.location.href = "../login.html";
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
function checkNewUser(users, email) {
  let checkUser;
  if (users.length == 0) {
    checkUser = true;
  } else {
    let user = users.find((u) => u.email == email);
    if (user) {
      checkUser = false;
    } else {
      // for (let i = 0; i < users.length; i++) {
      //   if (users[i]["email"] == email) {
      //     checkUser = false;
      //     return checkUser;
      // } else {
      checkUser = true;
      // }
    }
  }
  return checkUser;
}

/**
 * functions to save users to backend from here
 */

async function saveNewUser(users, newUser) {
  users.push(newUser);
  await backend.setItem("users", JSON.stringify(users));
}
