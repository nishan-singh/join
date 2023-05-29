function openNewContact() {
  modal.showModal();
  modal.classList.add("overlay-new-contact");
}

function closeOverlay() {
  modal.classList.remove("overlay-new-contact");
  modal.close();
}
