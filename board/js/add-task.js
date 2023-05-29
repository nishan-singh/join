/**
 * Check all requirements, save a new task to json, guid back to board.html and reset all used global variables
 *
 * @param {string} site - Give the information from which site the function is called (board.html or add-task-html)
 */
function addNewTask(site) {
  let title = document.getElementById("input-title").value;
  let description = document.getElementById("input-description").value;
  let date = document.getElementById("input-date").value;

  let task = {
    title: title,
    description: description,
    category: currentChosenCategory,
    "category-color": categoryColor,
    "workspace-category": categoryId,
    assigned: chosenContacts,
    "due-date": date,
    prio: chosenPrio,
    subtasks: subtasks,
    "prio-icon": prioIcon,
    subtasks: subtasks,
    "subtasks-done": "",
    id: new Date().getTime(),
  };

  checkForCategory();
  checkForChosenContact();
  checkForChosenPrio();
  checkAllRequirementsToSaveNewTask(site, task);
}

/**
 * This function check all requirements they are necessary to save a new task
 *
 * @param {string} site - Give the information from which site the function is called (board.html or add-task-html)
 * @param {Object} task - This object is the new task as a json
 */
async function checkAllRequirementsToSaveNewTask(site, task) {
  if (categoryId && chosenContact == true && chosenPriority == true) {
    document.getElementById("button-add-new-task").disabled = true;
    tasks.push(task);
    await backend.setItem("tasks", JSON.stringify(tasks));
    if (site == "Board") {
      document.getElementById("added-to-task").classList.add("display-flex");
      backToBoard();
    }
    if (site == "Add Task") {
      document.getElementById("added-to-task-1").classList.add("display-flex");
      backToBoardFromAddTask();
    }
  }
}

/**
 * Check if user already chose a category, if no ---> show text that choosing category is required
 */
function checkForCategory() {
  if (categoryId == undefined) {
    document
      .getElementById("text-category-required")
      .classList.add("display-flex");
  } else {
    document
      .getElementById("text-category-required")
      .classList.remove("display-flex");
  }
}

/**
 * Check if user already chose contacts to assign, if no ---> show text that choosing contacts is required
 */
function checkForChosenContact() {
  if (chosenContact == false) {
    document.getElementById("contact-required").classList.add("display-flex");
  } else {
    document
      .getElementById("contact-required")
      .classList.remove("display-flex");
  }
}

/**
 * Check if user already chose a priority, if no ---> show text that choosing priority is required
 */
function checkForChosenPrio() {
  if (chosenPriority == false) {
    document.getElementById("prio-required").classList.add("display-flex");
  } else {
    document.getElementById("prio-required").classList.remove("display-flex");
  }
}

/**
 * Open the add task window
 *
 * @param {string} currentCategory - Current workspace category (whre the function was called from)
 */
function addTask(currentCategory) {
  currentChosenCategory = currentCategory;
  let openedContainer = document.getElementById("container-opened-task");
  openedContainer.classList.add("display-flex");
  openedContainer.classList.add("new-task-container");
  document.getElementById("whole-site").classList.add("overflow-hidden-1");
  let boardArea = document.getElementById("container-opened-task");
  boardArea.innerHTML += createAddTaskWindow(year, month, day);
  renderContacts();
  //document.getElementById('add-task-window').classList.add('transition');
}

/**
 * Close add task window and reset a few global variables
 */
function closeAddTask() {

  document
    .getElementById("container-opened-task")
    .classList.remove("display-flex");
  document.getElementById("whole-site").classList.remove("overflow-hidden-1");
  let boardArea = document.getElementById("container-opened-task");
  boardArea.innerHTML = "";
  chosenContacts.splice(0);
  categoryId = undefined;
  chosenPriority = false;
  chosenContact = false;
  categoryColor = undefined;
}

/**
 * Prepare the next functions to give a color to chosen priority div
 *
 * @param {string} id - Id of the div
 * @param {string} prio - Chosen priority
 */
function setBorder(id, prio) {
  checkPrioUrgent(id, prio);
  checkPrioMedium(id, prio);
  checkPrioLow(id, prio);
}

function addBorder(num1, num2, num3, color1, color2, color3, prio, img) {
  document.getElementById(`prio-div${num1}`).classList.add(`bg-${color1}`);
  document.getElementById(`prio-img${num1}`).classList.add("become-white");
  document.getElementById(`prio-div${num2}`).classList.remove(`bg-${color2}`);
  document.getElementById(`prio-img${num2}`).classList.remove("become-white");
  document.getElementById(`prio-div${num3}`).classList.remove(`bg-${color3}`);
  document.getElementById(`prio-img${num3}`).classList.remove("become-white");
  chosenPrio = prio;
  prioIcon = `../img/${img}.png`;
  prioIconWhite = `../img/${img}.png`;
  chosenPriority = true;
}

/**
 * Check if priority "Urgent" is chosen and change color of div and icon
 *
 * @param {string} id - Id of the div
 * @param {string} prio - Chosen priority
 */
function checkPrioUrgent(id, prio) {
  if (id == "prio-div1") {
    addBorder(1, 2, 3, "red", "orange", "green", prio, "red-arrows-up");
  }
}

/**
 * Check if priority "Medium" is chosen and change color of div and icon
 *
 * @param {string} id - Id of the div
 * @param {string} prio - Chosen priority
 */
function checkPrioMedium(id, prio) {
  if (id == "prio-div2") {
    addBorder(2, 1, 3, "orange", "red", "green", prio, "orange-lines3");
    checkForChosenPrio();
  }
}

/**
 * Check if priority "Low" is chosen and change color of div and icon
 *
 * @param {string} id - Id of the div
 * @param {string} prio - Chosen priority
 */
function checkPrioLow(id, prio) {
  if (id == "prio-div3") {
    addBorder(3, 1, 2, "green", "red", "orange", prio, "green-arrows-down");
    checkForChosenPrio();
  }
}

/**
 * Remove the colors of divs and icons which comes from chosen category
 */
function removeAllBorders() {
  document.getElementById("prio-div1").classList.remove("bg-red");
  document.getElementById("prio-img1").classList.remove("become-white");
  document.getElementById("prio-div2").classList.remove("bg-red");
  document.getElementById("prio-img2").classList.remove("become-white");
  document.getElementById("prio-div3").classList.remove("bg-red");
  document.getElementById("prio-img3").classList.remove("become-white");
}

/**
 * Render all available contacts from json
 */
function renderContacts() {
  let contacts = document.getElementById("all-contacts");
  contacts.innerHTML = "";

  for (let c = 0; c < contact.length; c++) {
    const con = contact[c];
    contacts.innerHTML += createContacts(con, c);
  }
}

/**
 * Show the div with all contacts by onclick (otherwise is hide)
 */
function showContacts() {
  let contacts = document.getElementById("all-contacts");

  if (contacts.classList.contains("display-flex")) {
    contacts.classList.remove("display-flex");
    document.getElementById("drop-down-box").classList.remove("padding-bottom");
  } else {
    contacts.classList.add("display-flex");
    document.getElementById("drop-down-box").classList.add("padding-bottom");
    if (newCategory == false && isTaskOpen == false) {
      // document.getElementById("all-categorys").classList.remove("display-flex");
    }
  }
}

/**
 * Check if current contact is already chosen and in task, if no --> save current contact as chosen contact
 *
 * @param {string} id - Id of checkbox
 * @param {number} c - Number of the position in array
 */
function checkIfChecked(id, c) {
  let firstName = contact[c]["first-name"];
  let lastName = contact[c]["last-name"];
  let color = contact[c]["color"];
  let contactId = contact[c]["id"];
  let idToOpen = chosenContacts.findIndex(
    (search) => search["id"] == contactId
  );

  if (document.getElementById(id).checked && idToOpen == -1) {
    let names = {
      "first-name": firstName,
      "last-name": lastName,
      color: color,
      id: contactId,
    };
    chosenContacts.push(names);
    chosenContact = true;
    checkForChosenContact();
  } else {
    chosenContact = false;
    chosenContacts.splice(idToOpen, 1);
  }
}

/**
 * Show div with all categorys by onclick (otherwise is hide)
 */
function showCategorys() {
  document.getElementById("all-contacts").classList.remove("display-flex");
  let categorys = document.getElementById("all-categorys");
  console.log(categorys);
  if (categorys.classList.contains("display-flex")) {
    categorys.classList.remove("display-flex");
    categorys.innerHTML = "";
    document
      .getElementById("drop-down-box1")
      .classList.remove("padding-bottom");
  } else {
    categorys.classList.add("display-flex");
    categorys.innerHTML += createCategorys();
  }
}

/**
 * Clear input field and show the chosen category
 *
 * @param {string} category - Name of the chosen category
 * @param {string} color - color code
 */
function setCategory(category, color) {
  let categorys = document.getElementById("all-categorys");
  categorys.classList.remove("display-flex");
  categorys.innerHTML = "";
  document.getElementById("drop-down-box1").classList.remove("padding-bottom");
  document.getElementById("select-category").innerHTML = "";
  document.getElementById("select-category").innerHTML += showChosenCategory(
    category,
    color
  );
  categoryId = document.getElementById("chosen-category").innerHTML;
  categoryColor = color;
  checkForCategory();
}

/**
 * Create input field for the user to write a name for a new category
 */
function createNewCategory() {
  document.getElementById("all-categorys").classList.remove("display-flex");
  document.getElementById("drop-down-box1").classList.remove("padding-bottom");
  document.getElementById("drop-down-box1").innerHTML = "";
  document.getElementById("drop-down-box1").innerHTML += showInputNewCategory();

  if (
    document.getElementById("colors-new-category").classList.contains("d-none")
  ) {
    document.getElementById("colors-new-category").classList.remove("d-none");
  } else {
    document.getElementById("colors-new-category").innerHTML +=
      createColorPicker();
    document
      .getElementById("text-category-required")
      .classList.remove("display-flex");
  }
  newCategory = true;
}

/**
 * Check the requirements for saving new category name with color
 */
function saveNewCategory() {
  let input = document.getElementById("input-new-cat").value;
  if (input.length == 0 || categoryColor == undefined) {
    document
      .getElementById("text-category-required-name")
      .classList.add("display-flex");
  } else {
    document.getElementById("hook-category").classList.add("d-none");
    document.getElementById("border-line").classList.add("d-none");
    document.getElementById("x-mark-new-cat").classList.add("padding-left-30");
    categoryId = document.getElementById("input-new-cat").value;
    document
      .getElementById("text-category-required-name")
      .classList.remove("display-flex");
  }
}

/**
 * Show the chosen color in input field
 *
 * @param {string} className - Name of css class of chosen color point
 * @param {string} color - color code
 */
function choseColor(className, color) {
  document.getElementById("colors-new-category").classList.add("d-none");
  document.getElementById("color-div-new").innerHTML +=
    showChosenColor(className);
  categoryColor = color;
}

/**
 * Show previous input field
 */
function createOldCategorys() {
  document.getElementById("colors-new-category").classList.add("d-none");
  document
    .getElementById("text-category-required-name")
    .classList.remove("display-flex");
  document.getElementById("drop-down-box1").innerHTML = "";
  document.getElementById("drop-down-box1").innerHTML += showOldCategorys();
  categoryId = undefined;
  categoryColor = undefined;
  newCategory = false;
}

/**
 * Reset all input fields and choosing options
 */
function cancelNewTask() {
  document.getElementById("input-title").value = "";
  document.getElementById("input-description").value = "";
  document.getElementById("all-contacts").classList.remove("display-flex");
  document.getElementById("drop-down-box").classList.remove("padding-bottom");
  document.getElementById("input-date").value = "";
  document.getElementById("new-subtask-div").innerHTML = "";
  document
    .getElementById("text-category-required")
    .classList.remove("display-flex");
  document.getElementById("contact-required").classList.remove("display-flex");
  document.getElementById("prio-required").classList.remove("display-flex");
  chosenContacts.splice(0);
  createOldCategorys();
  resetGlobalVariabales();
  renderContacts();
  removeAllBorders();
}
