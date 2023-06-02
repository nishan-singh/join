setURL("https://join.nishan-singh.com/smallest_backend_ever");

/**
 * functions for opening popups
 */

async function openPopupMail() {
  await downloadFromServer();
  let currMail = document.getElementById("mail-registration").value;
  let userNotFound = document.getElementById("user-not-found");
  let users = (await JSON.parse(backend.getItem("users"))) || [];
  current_user = users.find((u) => u.email == currMail);
  await backend.setItem("user_found", JSON.stringify(current_user));

  if (current_user) {
    let popup = document.getElementById("mail-sent-popup");
    popup.classList.remove("d-none");
    userNotFound.classList.add("d-none");
    setTimeout(
      () => (window.location.href = "../new-password/new-password.html"),
      800
    );
  } else {
    userNotFound.classList.remove("d-none");
  }
}
