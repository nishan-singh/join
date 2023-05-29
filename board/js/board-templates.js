function createTodo(element, i) {
  return /*html*/ `
        <li draggable="true" ondragstart="startDragging(${element["id"]})" onclick="openTask(${element["id"]})" class="task" id="task${element["id"]}">
            <div class="div-category-move">
                <p style="background-color: ${element["category-color"]};" class="workspace-category">${element["workspace-category"]}</p>
            </div>
            <h4 class="title">${element["title"]}</h4>
            <p class="description">${element["description"]}</p>
            <div class="container-progress-bar">
                <div class="progress-bar-div" id="progress-bar-div${element["id"]}">
                    <div class="progress-bar" id="progress-bar${element["id"]}" style="width: 0"></div>
                </div>
                <p class="progress-bar-text" id="progress-bar-text${element["id"]}"></p>
            </div>
            <div class="contact-prio">
                <div class="contact-letters" id="contact-letters${element["id"]}">

                </div>
                <img class="prio-img" src="${element["prio-icon"]}">
            </div>
        </li>
    `;
}

function createLettersOfNames(name) {
  return /*html*/ `
        <div style="background-color: ${name["color"]};" class="contact">
            <div style="display: flex;">
                <p class="letter-p" style="margin-right: 1px;">${name[
                  "first-name"
                ].charAt()}</p>
                <p class="letter-p">${name["last-name"].charAt()}</p>
            </div>
        </div>
    `;
}

function createShowMore(number) {
  return /*html*/ `
        <div style="background-color: #2A3647;" class="contact">
            <p class="letter-p" style="margin-right: 1px;">+${number}</p>
        </div>
    `;
}

function createOpenedTask(idToOpen, date, id) {
  return /*html*/ `
        <div onclick="event.stopPropagation()" class="opened-task" id="opened-task${idToOpen}">
            <img class="x-mark-opened-task" onclick="closeTask()" src="../img/x-mark2.png">
            <div class="inner-div">
                <div class="w-category-xmark">
                    <p style="background-color: ${tasks[idToOpen]["category-color"]}; padding: 6px 25px!important;" class="workspace-category opened-workspace-c">${tasks[idToOpen]["workspace-category"]}</p>
                    <div class="move-button-div">
                        <div onclick="showCategorysResponsivness(${idToOpen})" class="move-button">
                            <p class="move-div-p">Move worspace</p>
                        </div>
                        <div id ="move-workspace-category" class="move-workspace-category"></div>
                    </div>
                </div>
                <h2 class="opened-task-title">${tasks[idToOpen]["title"]}</h2>
                <p class="opened-task-description">${tasks[idToOpen]["description"]}</p>
                <div class="opened-task-date">
                    <p class="first-p">Due date:</p>
                    <p class="second-p">${date}</p>
                </div>
                <div class="opened-task-priority">
                    <p class="first-p">Priority:</p>
                    <div class="opened-task-prio" id="opened-task-prio">
                        <p class="third-p">${tasks[idToOpen]["prio"]}</p>
                        <img class="icons-white" src="${tasks[idToOpen]["prio-icon"]}">
                    </div>
                </div>
                <div class="co-workers">
                    <p class="first-p">Assigned to:</p>
                    <div class="opened-task-names" id="opened-task-names">
                        
                    </div>
                </div>
                <div class="opened-task-sub-div" id="opened-task-sub-div">
                    <p class="first-p">Subtasks:</p>
                    <div class="subtasks-to-edit" id="subtasks-to-edit"></div>
                </div>
                </div>
                <div class="edit-cancel">
                    <button onclick="deleteTask(${idToOpen})" class="background-div">
                        <img class="delete-icon" src="../img/delete.png">
                    </button>    
                    <button onclick="editTask(${idToOpen}, ${id})" class="background-div">
                        <img src="../img/pencil.png">
                    </button>  
                </div>
        </div>
    `;
}

function createNamesOnOpenedTask(name) {
  return /*html*/ `
        <div class="new-name-opened-card">
            <p style="background-color: ${
              name["color"]
            };" class="name-letters">${name["first-name"]
    .charAt(0)
    .toUpperCase()}${name["last-name"].charAt(0).toUpperCase()}</p>
            <p style="margin: 0;">${name["first-name"]} ${name["last-name"]}</p>
        </div>
    `;
}

function createSubtasksOnOpenedTask(subtask, s, idToOpen) {
  return /*html*/ `
        <div class="new-subtask-opened-task">
            <p style="margin: 0 4px 0 0 ;">&#9679; ${subtask["subtask"]}</p>
        </div>
    `;
}

function createSubtasksOnEditableTask(subtask, s, idToOpen) {
  return /*html*/ `
        <div class="new-subtask-opened-task">
            <p style="margin: 0 4px 0 0 ;">${subtask["subtask"]}</p>
            <div style="margin-right: 10px;">
            <input onclick="saveDoneSubtask(${idToOpen}, 'checkbox-sub${s}', ${s})" id="checkbox-sub${s}" type="checkbox">
            <img onclick="deleteSubtask(${idToOpen}, ${s})" class="subtasks-edit-delete" src="../img/delete.png">
            </div>
        </div>
    `;
}

function createEditableTask(idToOpen, id) {
  return /*html*/ `
    <button class="close-button" onclick="closeTask()"><img src="../img/x-mark2.png"></button>
        <div class="inner-div edit-form">
                <div class="div-title-edit-task">
                        <p class="add-task-p-edit-task">Title</p>
                        <input required id="input-title-edit-task" value="${tasks[idToOpen]["title"]}" class="add-task-input-edit-task" type="text" placeholder="Enter a title">
                    </div>
                <div style="margin-bottom: 10px;" class="div-description">
                    <p class="add-task-p-edit-task">Description</p>
                    <textarea required id="input-description-edit-task" class="add-task-placeholder-edit-task" placeholder="Enter a Description" rows="2"></textarea>
                </div>
                <div class="div-date-edit-task">
                        <p class="add-task-p-edit-task">Due date</p>
                        <input id="input-date-edit-task" value="${tasks[idToOpen]["due-date"]}" class="input-date-edit-task" type="date" required min="${year}-${month}-${day}" max="2025-01-01" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="container-prio-edit-task">
                        <p class="add-task-p-edit-task">Prio</p>
                        <div class="add-task-prio-container change-flex">
                            <div class="add-task-prio-div" id="prio-div1" onclick="setBorder('prio-div1', 'Urgent')">
                                <p class="font-size-16 font-size-12" style="font-size: 18px;">Urgent</p>
                                <img id="prio-img1" src="../img/red-arrows-up.png">
                            </div>
                            <div class="add-task-prio-div" id="prio-div2" onclick="setBorder('prio-div2', 'Medium')">
                                <p class="font-size-16 font-size-12" style="font-size: 18px;">Medium</p>
                                <img id="prio-img2" src="../img/orange-lines3.png">
                            </div>
                            <div class="add-task-prio-div" style="margin-right: 0!important;" id="prio-div3" onclick="setBorder('prio-div3', 'Low')">
                                <p class="font-size-16 font-size-12" style="font-size: 18px;">Low</p>
                                <img id="prio-img3" src="../img/green-arrows-down.png">
                            </div>
                        </div>
                        <p class="text-prio-required" id="prio-required">Bitte wähle die Priorität des Tasks</p>
                    </div>
                    <div>
                        <p style="font-weight: 700; font-size: 18px;" class="add-task-p font-size-16">Assigned to</p>
                        <div id="drop-down-box" class="drop-down-box-edit-task">
                            <div onclick="showContacts()" class="input-div-new" style="height: 40px;">
                                <p class="padding-left" style="margin: 0;">Select contacts to assign</p>
                                <img class="arrow-down" src="../img/arrow-down1.png">
                            </div>
                            <div class="div-all-contacts" id="all-contacts"></div>
                        </div>
                        <p class="subtask-required" id="contact-required">Bitte wähle mindestens einen Kontakt aus</p>
                    </div>
                    <div style="margin-top: 12px; margin-bottom: 0;" class="opened-task-sub-div" id="opened-task-sub-div1">
                        <p style="font-weight: 700; font-size: 18px;" class="first-p font-size-16">Subtasks:</p>
                        <div style="margin-top: 2px;" class="subtasks-to-edit" id="subtasks-to-edit1"></div>
                        <button onclick="createNewSubtask(${idToOpen})" class="add-subtask" id="add-subtask-button">Add Subtask</button>
                    </div>
                    <div class="edit-cancel save-edit">
                    <button onclick="saveEditedTask(${id}, ${idToOpen});" class="background-div-edit-task" id="ok-button">
                        <p class="text-ok">Ok</p>
                        <img src="../img/vector-ok.png">
                    </button>    
                </div>
                    </div>
    `;
}

function createContactsToEdit(con, c) {
  return /*html*/ `
        <div class="container-contacts">
            <p style="margin: 0;">${con["first-name"]} ${con["last-name"]}</p>
            <input onclick="checkIfChecked('checkbox${c}', ${c})" id="checkbox${c}" class="contact-checkbox" type="checkbox" name="box">
        </div>
    `;
}

{
  /* <div onclick="showCategorys()" class="input-div-new">
<p id="select-category" style="margin: 0;">Select task category</p>
<img class="arrow-down" src="../img/arrow-down1.png">
</div> */
}

function createAddTaskWindow(year, month, day) {
  return /*html*/ `
        <div class="add-task-window" id="add-task-window">
        <button onclick="closeAddTask()" class="x-mark-add-task"><img  src="../img/x-mark2.png"></button>    
        <form class="form-add-task-window" onsubmit="addNewTask('Board'); return false;">
                <h2 class="add-task-headline">Add Task</h2>\
            <div class="add-task-inner-div">
                <div class="left-container">
                    <label for="input-title" class="add-task-p">Title</label>
                    <input
                    oninvalid="this.setCustomValidity('This field is required')"
                    oninput="setCustomValidity('')"
                    required id="input-title" class="add-task-input" type="text" placeholder="Enter a title">
                    <label for="input-description" class="add-task-p">Description</label>
                    <textarea
                    oninvalid="this.setCustomValidity('This field is required')"
                    oninput="setCustomValidity('')"
                    required id="input-description" class="add-task-placeholder" 
                    placeholder="Enter a Description"></textarea>
                    <div class="div-add-category" id="div-add-category">
                    <p class="add-task-p">Category</p>
                    <div id="drop-down-box1" class="drop-down-box">
                        <div onclick="showCategorys()" class="input-div-new">
                            <p id="select-category" style="margin: 0;">Select task category</p>
                            <img class="arrow-down" src="../img/arrow-down1.png">
                        </div>
                        <div class="div-all-categorys" id="all-categorys">

                        </div>
                    </div>
                    <div class="colors-new-category" id="colors-new-category"></div>
                    <p class="text-category-required" id="text-category-required">Please choose a category</p>
                    <p class="text-category-required" id="text-category-required-name" style="margin-top: 2px;">Please choose a category name and a color</p>
                </div>
                    <div class="colors-new-category" id="colors-new-category">
                    </div>
                    <p class="text-category-required" id="text-category-required">Please choose a category</p>
                    <p class="text-category-required" id="text-category-required-name" style="margin-top: 2px;">Please choose a category name and a color</p>
                    <div class="div-assigned-to">
                        <p class="add-task-p">Assigned to</p>
                        <div id="drop-down-box" class="drop-down-box">
                            <div onclick="showContacts()" class="input-div-new">
                                <p class="p-contact-3" style="margin: 0;">Select contacts to assign</p>
                                <img class="arrow-down" src="../img/arrow-down1.png">
                            </div>
                            <div class="div-all-contacts" id="all-contacts"></div>
                        </div>
                        <p class="subtask-required" id="contact-required">Please choose at least one contact</p>
                    </div>
                </div>
                <div class="right-container">
                    <div class="div-date">
                        <p class="add-task-p">Due date</p>
                        <input id="input-date" class="add-task-input-date" type="date"
                        oninvalid="this.setCustomValidity('This field is required')"
                        oninput="setCustomValidity('')"
                        required min="${year}-${month}-${day}" max="2025-01-01" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="container-prio">
                        <p class="add-task-p">Prio</p>
                        <div class="add-task-prio-container">
                            <div class="add-task-prio-div" id="prio-div1" onclick="setBorder('prio-div1', 'Urgent')">
                                <p>Urgent</p>
                                <img id="prio-img1" src="../img/red-arrows-up.png">
                            </div>
                            <div class="add-task-prio-div" id="prio-div2" onclick="setBorder('prio-div2', 'Medium')">
                                <p>Medium</p>
                                <img id="prio-img2" src="../img/orange-lines3.png">
                            </div>
                            <div class="add-task-prio-div" style="margin-right: 0!important;" id="prio-div3" onclick="setBorder('prio-div3', 'Low')">
                                <p>Low</p>
                                <img id="prio-img3" src="../img/green-arrows-down.png">
                            </div>
                        </div>
                        <p class="text-prio-required" id="prio-required">Please choose the priority of the task</p>
                    </div>
                    <div class="big-container-subtasks" style="width: 90%;">
                        <p style="width: 100%;" class="add-task-p">Subtasks</p>
                        <div class="add-task-input div-subtask" id="subtask-div">
                            <input class="input-subtask" type="text" placeholder="Add new subtask" onclick="changeSubtaskInput()">
                            <img onclick="changeSubtaskInput()" src="../img/plus.png">
                        </div>
                        <p class="subtask-required" id="subtask-required">The subtask can't be empty</p>
                        <div class="new-subtask-div" id="new-subtask-div"></div>
                    </div>
                    <div class="container-buttons">
                <button onclick="cancelNewTask()" class="add-task-cancel-button">
                    <p>Cancel</p>
                    <p>X</p>
                </button>
                <button id="button-add-new-task" class="create-task-button">
                    <p>Create Task</p>
                    <img src="../img/hook.png">
                </button>
            </div>
                </div>
            </div>
        </form>
        </div>
    `;
}

function createNewSubtastInput() {
  return /*html*/ `
            <input class="input-subtask" type="text" id="new-subtask" placeholder="New Subtask">
            <div class="container-icons-subtask margin-right-0">
                <img onclick="showOldInput()" class="x-mark-subtask" src="../img/x-mark1.png">
                <div class="border-line"></div>
                    <img onclick="setNewSubtask()" class="hook" id="hook-button" src="../img/hook.png">
                </div>
    `;
}

function createInputSubtask(idToOpen) {
  return /*html*/ `
        <div class="div-input-sub-edit">
            <input class="input-subtask" type="text" id="created-new-subtask" placeholder="New Subtask">
            <div style="margin-left: 60px;" class="container-icons-subtask no-margin-right">
                <img onclick="cancelSubtaskInput(${idToOpen})" class="x-mark-subtask" src="../img/x-mark1.png">
                <div class="border-line"></div>
                    <img onclick="saveNewSubtask(${idToOpen})" class="hook" id="hook-button-1" src="../img/hook.png">
                </div>
            </div>    
        </div>    
        <p class="subtask-required" id="subtask-required-edit">Der Subtask darf nicht leer sein</p>
    `;
}

function createOldSubtastInput() {
  return /*html*/ `
        <input class="input-subtask" type="text" placeholder="Add new subtask" onclick="changeSubtaskInput()">
        <img onclick="changeSubtaskInput()" src="../img/plus.png">
    `;
}

function newCheckBox(sub) {
  return /*html*/ `
        <div style="display: flex; margin-bottom: 10px;">
            <input type="checkbox" checked>
        <p class="subtask-text">${sub}</p>
        </div>
    `;
}

function createContacts(con, c) {
  return /*html*/ `
        <div class="container-contacts">
            <p style="margin: 0;">${con["first-name"]} ${con["last-name"]}</p>
            <input onclick="checkIfChecked('checkbox${c}', ${c})" id="checkbox${c}" class="contact-checkbox" type="checkbox" name="box">
        </div>
    `;
}

// <div class="category-color" onclick="createNewCategory()">
//     <p class="category-text">New category</p>
// </div>
// <select name="format" id="format">
// </select>
function createCategorys() {
  return /*html*/ `
            <div class="category-color" onclick="createNewCategory()">
            <p class="category-text">New category</p>
            </div>
            <div class="category-color" onclick="setCategory('Design', '#2AD300')">
            <p class="category-text">Design</p>
            <div class="color-point-green"></div>
            </div>
            <div class="category-color" onclick="setCategory('Backoffice', '#FF8A00')">
            <p class="category-text">Backoffice</p>
            <div class="color-point-orange"></div>
            </div>
            <div class="category-color" onclick="setCategory('Sales', '#E200BE')">
            <p class="category-text">Sales</p>
            <div class="color-point-lila"></div>
            </div>
            <div class="category-color" onclick="setCategory('Marketing', '#8AA4FF')">
            <p class="category-text">Marketing</p>
            <div class="color-point-lightblue"></div>
            </div>
    `;
}

function showChosenCategory(category, color) {
  return /*html*/ `
        <div class="chosen-category-div">
            <p id="chosen-category" class="category-text chosen-text">${category}</p>
            <div style="background-color: ${color};" class="color-point"></div>
        </div>
    `;
}

function showInputNewCategory() {
  return /*html*/ `
        <div class="new-div-category-input">
            <input id="input-new-cat" class="input-new-cat" type="text" placeholder="New category name">
            <div id="color-div-new"></div>
            <div class="container-icons-subtask div-new-cat" id="container-icons">
                <img onclick="createOldCategorys()" id="x-mark-new-cat" class="x-mark-subtask" src="../img/x-mark1.png">
                <div id="border-line" class="border-line"></div>
                <button><img onclick="saveNewCategory()" class="hook" id="hook-category" src="../img/hook.png"></button>
            </div>
        </div>
    `;
}

function createColorPicker() {
  return /*html*/ `
        <div onclick="choseColor('color-point-lightblue', '#8AA4FF')" class="color-point-lightblue"></div>
        <div onclick="choseColor('color-point-red', '#FF0000')" class="color-point-red"></div>
        <div onclick="choseColor('color-point-green', '#2AD300')" class="color-point-green"></div>
        <div onclick="choseColor('color-point-orange', '#FF8A00')" class="color-point-orange"></div>
        <div onclick="choseColor('color-point-lila', '#E200BE')" class="color-point-lila"></div>
        <div onclick="choseColor('color-point-darkblue', '#0038FF')" class="color-point-darkblue"></div>
    `;
}

function showOldCategorys() {
  return /*html*/ `
        <div onclick="showCategorys()" class="input-div-new">
            <p id="select-category" style="margin: 0;">Select task category</p>
            <img class="arrow-down" src="../img/arrow-down1.png">
        </div>
        <div class="div-all-categorys" id="all-categorys"></div>
    `;
}

function showChosenColor(className) {
  return /*html*/ `
        <div class="${className}"></div>
    `;
}

function createNewDivForDate() {
  return /*html*/ `
        <p class="add-task-p">Due date</p>
        <input id="input-date" class="add-task-input-date title-site-add-task" type="date" 
        oninvalid="this.setCustomValidity('This field is required')"
        oninput="setCustomValidity('')"
        required min="${year}-${month}-${day}" max="2025-01-01" placeholder="dd/mm/yyyy">
    `;
}

function createTextAddedTask() {
  return /*html*/ `
        <div class="added-to-task" id="added-to-task">
            <p>Task added to board</p>
            <img style="margin-left: 12px;" src="../img/board-icon.png">
        </div>
    `;
}

function createWorkspaceCategorys(idToOpen) {
  return /*html*/ `
        <button class="category-hook" onclick="changeWorkspace(${idToOpen}, 'To do')">
            <p class="choose-category-p move-div-p">To Do</p>
            <img id="category-hook1" src="../img/hook.png">
        </button>
        <button class="category-hook" onclick="changeWorkspace(${idToOpen}, 'In Progress')">
            <p class="choose-category-p move-div-p">In progress</p>
            <img id="category-hook2" src="../img/hook.png">
        </button>
        <button class="category-hook" onclick="changeWorkspace(${idToOpen}, 'Awaiting Feedback')">
            <p class="choose-category-p move-div-p">Awaiting feedback</p>
            <img id="category-hook3" src="../img/hook.png">
        </button>
        <button class="category-hook" onclick="changeWorkspace(${idToOpen}, 'Done')">
            <p class="choose-category-p move-div-p">Done</p>
            <img id="category-hook4" src="../img/hook.png">
        </button>
    `;
}
