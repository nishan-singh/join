function sidebarLinkActive() {
  let sidebarLinks = document.querySelectorAll(".each-sidebar-link");
  let sidebarIcons = document.querySelectorAll(".sidebar-icon");
  sidebarLinks.forEach((sidebarLink) => {
    sidebarLink.classList.remove("active");
    let mutedIcon = sidebarLink.getElementsByTagName("path");
    let mutedCircleIcon = sidebarLink.getElementsByTagName("circle");
    mutedIconFunc(mutedIcon);
    mutedCircleIconFunc(mutedCircleIcon);
    if (checkIfIncludes("homepage.html", "Summary", sidebarLink)) {
      activeLinkFunc(sidebarLink);
    } else if (checkIfIncludes("board.html", "Board", sidebarLink)) {
      activeLinkFunc(sidebarLink);
    } else if (checkIfIncludes("add-task.html", "Add Task", sidebarLink)) {
      activeLinkFunc(sidebarLink);
    } else if (checkIfIncludes("contacts.html", "Contacts", sidebarLink)) {
      activeLinkFunc(sidebarLink);
    } else if (checkIfIncludes("legal-notice.html", "Legal Notice", sidebarLink)) {
      activeLinkFunc(sidebarLink);
    }
  });
}

function checkIfIncludes(href, text, link) {
  return (
    window.location.href.includes(href) && link.innerText.trim() === text.trim()
  );
}

function activeLinkFunc(activeLink) {
  let eachSidebarLink = activeLink.querySelector(".sidebar-links");
  eachSidebarLink.classList.add("active");
  activeLink.classList.add("active");
  let activeIcon = activeLink.getElementsByTagName("path");
  let activeCircleIcon = activeLink.getElementsByTagName("circle");
  activeIconFunc(activeIcon);
  activeCircleIconFunc(activeCircleIcon);
}

function mutedIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.fill = "#CDCDCD";
  }
}

function activeCircleIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.stroke = "white";
  }
}

function mutedCircleIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.stroke = "#CDCDCD";
  }
}

function activeIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.fill = "white";
  }
}

function showLogOut() {
  let list = document.getElementById("log-out");
  if (window.innerWidth <= 872) {
    list.classList.remove("show-log-out");
    list.classList.toggle("log-out-for-mobile");
  } else if (window.innerWidth >= 872) {
    list.classList.remove("log-out-for-mobile");
    list.classList.toggle("show-log-out");
  }
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