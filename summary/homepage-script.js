const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function init() {
  await getDataFromBackend();
  await includeHTML();
  getDate();
  sidebarLinkActive();
}

setURL("https://nishan-singh.developerakademie.net/join/smallest_backend_ever");

async function getDataFromBackend() {
  await downloadFromServer();
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  let greetUser = (await JSON.parse(backend.getItem("greet_user"))) || [];
  allTasksCount(tasks);
  greetCurrentUser(greetUser);
}

function greetCurrentUser(greet_user) {
  let greet = document.getElementById("user-name");
  greet.innerHTML = "";
  if (greet_user["name"]) {
    greet.innerHTML = greet_user["name"];
  } else {
    greet.innerHTML = "Guest";
  }
  getTime();
}

function getTime() {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let wishingContainer = document.getElementById("wishes");
  if (hours > 0 && hours < 12 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Morning,";
  } else if (hours >= 12 && hours < 17 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Afternoon,";
  } else if (hours >= 17 && hours < 20 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Evening,";
  } else if (hours >= 20 && hours < 24 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Night,";
  }
}

function allTasksCount(tasks) {
  let allTasksTotal = document.getElementById("board-tasks-total");
  allTasksTotal.innerHTML = "";
  allTasksTotal.innerHTML = tasks.length;
  // All Different Categories
  allDifferentTasksCount(tasks);
}

function allDifferentTasksCount(tasks) {
  showTasksByCategory(tasks, "progress-tasks-total", "In Progress");
  showTasksByCategory(
    tasks,
    "awaiting-feedback-tasks-total",
    "Awaiting Feedback"
  );
  showTasksByCategory(tasks, "to-do-tasks-total", "To do");
  showTasksByCategory(tasks, "done-tasks-total", "Done");
  showUrgentTask(tasks);
}

function showTasksByCategory(tasks, id, categoryName) {
  let tasksTotal = document.getElementById(id);
  tasksTotal.innerHTML = "";
  let taskCount = tasks.filter(
    (eachTask) => eachTask["category"] === categoryName
  );
  tasksTotal.innerHTML = taskCount.length;
}

function showUrgentTask(tasks) {
  let urgentTask = document.getElementById("urgent-tasks-total");
  let taskCount = tasks.filter((eachTask) => eachTask["prio"] === "Urgent");
  urgentTask.innerHTML = taskCount.length;
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html"); // "includes nav-sidebar.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

let date = new Date();

function getDate() {
  let todayDate = document.getElementById("date");
  let monthNum = date.getMonth();
  let year = date.getFullYear();
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  todayDate.innerHTML = "";
  todayDate.innerHTML = `${monthNames[monthNum]} ${day}, ${year}`;
}

if (window.innerWidth <= 1200) {
  showGreeting();
  setTimeout(hideGreeting, 1475);
}

function showGreeting() {
  if (window.innerWidth <= 1200) {
    document
      .querySelector(".main-section")
      .classList.add("main-section-for-greeting");
    document
      .querySelector(".todo-section")
      .classList.add("d-none");
    document
      .querySelector(".summary-wrapper")
      .classList.add("d-none");
    document
      .querySelector(".greeting-wrapper")
      .classList.add("greeting-wrapper-for-greeting");
    document.getElementById("nav-sidebar-wrapper").classList.add("d-none");
  }
}

function hideGreeting() {
  document.querySelector(".greeting-wrapper").classList.remove("d-none");
  document.querySelector(".greeting-wrapper").classList.add("d-none");
  document
    .querySelector(".main-section")
    .classList.remove("main-section-for-greeting");
  document
    .querySelector(".todo-section")
    .classList.remove("d-none");
  document
    .querySelector(".summary-wrapper")
    .classList.remove("d-none");
  // document.querySelector(".greeting-wrapper").classList.add("hide-greeting");
  document.getElementById("nav-sidebar-wrapper").classList.remove("d-none");
}
