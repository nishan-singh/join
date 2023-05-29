let currentDraggedElement;
let categoryId;
let categoryColor;
let chosenPrio;
let prioIcon;
let prioIconWhite;
let currentChosenCategory;
let chosenContact = false;
let chosenPriority = false;
let newCategory = false;
let isTaskOpen = false;

let dateToday = new Date();
let year = dateToday.getFullYear();
let month = dateToday.getMonth() + 1;
let day = dateToday.getDate();

setURL("https://nishan-singh.developerakademie.net/join/smallest_backend_ever");

/**
 * Initialize the website, get data from backend and prepare the frontend
 */
async function init() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  subtasks = JSON.parse(backend.getItem("subtasks")) || [];
  contact = JSON.parse(backend.getItem("contact")) || [];
  chosenContacts = JSON.parse(backend.getItem("chosenContacts")) || [];
  doneSubtasks = JSON.parse(backend.getItem("doneSubtasks")) || [];
  await includeHTML();
  renderAllTasks();
  generateMonth();
  generateDay();
  renderTextAddedTask();
  sidebarLinkActive();
}

/**
 * Initialize the website, get data from backend and prepare the frontend
 */
async function initAddTaskPage() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  subtasks = JSON.parse(backend.getItem("subtasks")) || [];
  contact = JSON.parse(backend.getItem("contact")) || [];
  chosenContacts = JSON.parse(backend.getItem("chosenContacts")) || [];
  doneSubtasks = JSON.parse(backend.getItem("doneSubtasks")) || [];
  currentChosenCategory = "To do";
  await includeHTML();
  generateMonth();
  generateDay();
  generateDateForAddTask();
  renderContacts();
  sidebarLinkActive();
  document.getElementById("added-to-task-1").classList.remove("display-flex");
}

/**
 * Generate the current month in the correct format
 */
function generateMonth() {
  let monthLength = month.toString().length;

  if (month < 10 && monthLength < 2) {
    month = "0" + month;
  }
}

/**
 * Generate the current day in the correct format
 */
function generateDay() {
  let dayLength = day.toString().length;

  if (day < 10 && dayLength < 2) {
    day = "0" + day;
  }
}

/**
 * Generate a dynamic date for add-task.html
 */
function generateDateForAddTask() {
  document.getElementById("div-date").innerHTML = "";
  document.getElementById("div-date").innerHTML += createNewDivForDate();
}

/**
 * Render all tasks for board in four different workspaces
 */
function renderAllTasks() {
  renderWorkspace("To do", "to-do-area");
  renderWorkspace("In Progress", "in-progress-area");
  renderWorkspace("Awaiting Feedback", "awaiting-feedback-area");
  renderWorkspace("Done", "done-area");
}

/**
 * Render alls tasks and filter them into four different workspaces
 *
 * @param {string} category - This is the name of the current category
 * @param {string} id - This is the id of the worspace div, where the task should be save in
 */
async function renderWorkspace(category, id) {
  let filteredItems = tasks.filter((t) => t["category"] == category);

  document.getElementById(id).innerHTML = "";

  for (let i = 0; i < filteredItems.length; i++) {
    let element = filteredItems[i];

    document.getElementById(id).innerHTML += createTodo(element, i);
    createProgressBarForTask(element);
    let currentId = element["id"];
    renderLettersOfNames(currentId, element);
    checkForAmountContacts(currentId, element);
  }
}

/**
 * Render the letters of the chosen contacts on every task in board
 *
 * @param {number} currentId - This is the id of the current task
 * @param {Object} element - This is the current task
 */
function renderLettersOfNames(currentId, element) {
  let idToOpen = tasks.findIndex((task) => task["id"] == currentId);
  let lettersArea = document.getElementById(`contact-letters${element["id"]}`);
  lettersArea.innerHTML = "";

  for (let i = 0; i < tasks[idToOpen]["assigned"].length; i++) {
    let name = tasks[idToOpen]["assigned"][i];
    if (i <= 1) {
      lettersArea.innerHTML += createLettersOfNames(name);
    }
  }
}

/**
 * This function checks the amount of chosen contacts from current task and render "+" and a number
 *
 * @param {number} currentId - This is the id of the current task
 * @param {Object} element - This is the current task
 */
function checkForAmountContacts(currentId, element) {
  let lettersArea = document.getElementById(`contact-letters${element["id"]}`);
  let idToOpen = tasks.findIndex((task) => task["id"] == currentId);
  let number = tasks[idToOpen]["assigned"].length - 2;
  if (tasks[idToOpen]["assigned"].length > 2) {
    lettersArea.innerHTML += createShowMore(number);
  }
}

/**
 * This function create the nav- and sidebar
 */
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

/**
 * This function is used for drag and drop and gives the id for working drag and drop
 *
 * @param {number} id - Id of current task
 */
function startDragging(id) {
  currentDraggedElement = id;
  document.getElementById(`task${id}`).classList.add("move-task");
}

/**
 * This function is used for drag and drop, change the workspace category of dragged task and render the board new
 *
 * @param {string} category -  Workspace category/ div where the element dropped in
 */
let categorys = document.querySelectorAll(".task-area");

async function moveTo(category) {
  let currentIndex = tasks.findIndex(
    (task) => task["id"] == currentDraggedElement
  );
  tasks[currentIndex]["category"] = category;
  renderAllTasks();
  categorys.forEach((category) => (category.style.minHeight = "0"));
  await backend.setItem("tasks", JSON.stringify(tasks));
}

/**
 * This function shows the areas in a darker color, where it's possible to drop a task in
 *
 * @param {string} id - Name of the workspace area
 */
function highlight(id) {
  let currCategory = document.getElementById(id);
  categorys.forEach((category) => (category.style.minHeight = "250px"));
  currCategory.classList.add("highlight");
}

function removeHighlight(id) {
  let mutedHighlight = document.getElementById(id);
  mutedHighlight.classList.remove("highlight");
}

/**
 * Allow drop for elements
 *
 * @param {Object} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Prepare next functions to render progress bar on current task at board
 *
 * @param {Object} element - Current task
 */
function createProgressBarForTask(element) {
  let length = element["subtasks"].length;
  let done = element["subtasks-done"].length;
  let width = (done / length) * 100;

  let progressBars = document.querySelectorAll(".container-progress-bar");
  progressBars.forEach((progressBar) => (progressBar.style.display = "flex"));
  document.getElementById(
    `progress-bar${element["id"]}`
  ).style = `width: ${width}%`;
  document.getElementById(
    `progress-bar-text${element["id"]}`
  ).innerHTML = `${done}/${length} Done`;

  if (length == 0) {
    document
      .getElementById(`progress-bar-div${element["id"]}`)
      .classList.add("d-none");
    document.getElementById(`progress-bar-text${element["id"]}`).innerHTML = "";
  }
}

/**
 * The user is able to search for a task --> Prepare the next functions to filter the tasks
 */
function filterAllWorkspaces() {
  filterWorkspace("To do", "to-do-area");
  filterWorkspace("In Progress", "in-progress-area");
  filterWorkspace("Awaiting Feedback", "awaiting-feedback-area");
  filterWorkspace("Done", "done-area");
}

/**
 * Filter each workspace for the input the user gives into the input field
 *
 * @param {string} category - Workspace category
 * @param {string} id - Id of the div of workspace
 */
function filterWorkspace(category, id) {
  let filteredItems = tasks.filter((t) => t["category"] == category);
  let search = document.getElementById("search-tasks").value;
  search = search.toLowerCase();

  let area = document.getElementById(id);
  area.innerHTML = "";

  setFilter(filteredItems, search, area);
}

/**
 * Render only the filtered tasks
 *
 * @param {number} filteredItems - Number of task, which was find by filtering
 * @param {string} search - Value of input field
 * @param {Object} area - Workspace area
 */
function setFilter(filteredItems, search, area) {
  if (search) {
    for (let i = 0; i < filteredItems.length; i++) {
      let element = filteredItems[i];

      if (
        element["title"].toLowerCase().includes(search) ||
        element["description"].toLowerCase().includes(search)
      ) {
        area.innerHTML += createTodo(element);
        createProgressBarForTask(element);
      }
    }
  }
  if (search.length == "") {
    renderAllTasks();
  }
}

/**
 * Show input field to write the name of a subtask
 */
function changeSubtaskInput() {
  let input = document.getElementById("subtask-div");
  input.innerHTML = "";
  input.innerHTML += createNewSubtastInput();
  document.getElementById("new-subtask").focus();

  let sub = document.getElementById("new-subtask");

  sub.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("hook-button").click();
    }
  });
}

/**
 * Show the previous input field at subtask
 */
function showOldInput() {
  let input = document.getElementById("subtask-div");
  input.innerHTML = "";
  input.innerHTML += createOldSubtastInput();
  document.getElementById("subtask-required").classList.remove("display-flex");
}

/**
 * Reset some global variables
 */
function resetGlobalVariabales() {
  categoryId = undefined;
  categoryColor = undefined;
  chosenPriority = false;
  chosenContact = false;
  categoryColor = undefined;
}

/**
 * If the user add a task successfull, this function render the text "Task added to board"
 */
function renderTextAddedTask() {
  let textArea = document.getElementById("container-opened-task");
  textArea.innerHTML = "";
  textArea.innerHTML += createTextAddedTask();
}

/**
 * This function guide back to board.html and reset all used global variables
 */
function backToBoard() {
  setTimeout(() => {
    cancelNewTask();
    closeAddTask();
    init();
    chosenContacts.splice(0);
    chosenPriority = false;
    chosenContact = false;
    categoryId = undefined;
    categoryColor = undefined;
  }, 1500);
}

/**
 * This function guid to board.html from add-task.html after successfull save new task
 */
function backToBoardFromAddTask() {
  setTimeout(() => {
    chosenContacts.splice(0);
    chosenPriority = false;
    chosenContact = false;
    categoryId = undefined;
    categoryColor = undefined;
    window.location.href = "board.html";
    document.getElementById("added-to-task-1").classList.remove("display-flex");
  }, 1500);
}
