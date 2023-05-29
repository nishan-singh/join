/**
 * Opens the task that was clicked
 * 
 * @param {number} id - Id of current task 
 */
function openTask(id) {
    let currentId = id;
    let idToOpen = tasks.findIndex(task => task['id'] == currentId);
    let date = tasks[idToOpen]['due-date'];
    date = date.split("-").reverse().join("-");
    document.getElementById('container-opened-task').classList.add('display-flex');
    document.getElementById('whole-site').classList.add('overflow-hidden-1');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML = '';
    boardArea.innerHTML += createOpenedTask(idToOpen, date, id);
    renderNamesOnOpenedTask(idToOpen);
    checkColorForPrio(idToOpen);
    renderSubtasksOnOpenedTask(idToOpen);
}


/**
 * This function delete a task from json and update the board.html site
 * 
 * @param {number} id - Number of the position in array from current task
 */
async function deleteTask(id) {
    tasks.splice(id, 1);
    await backend.setItem('tasks', JSON.stringify(tasks));
    closeTask();
    renderAllTasks();
}


/**
 * Render the chosen contacts of the current task on the opened task
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function renderNamesOnOpenedTask(idToOpen) {
    let namesArea = document.getElementById('opened-task-names');
    namesArea.innerHTML = '';

    for (let i = 0; i < tasks[idToOpen]['assigned'].length; i++) {
        let name = tasks[idToOpen]['assigned'][i];

        namesArea.innerHTML += createNamesOnOpenedTask(name);
    }
}


/**
 * Check which priority is chosen on current task and show the corresponding color
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function checkColorForPrio(idToOpen) {
    if (tasks[idToOpen]['prio'] == 'Urgent') {
        document.getElementById('opened-task-prio').classList.add('bg-red');
    }
    if (tasks[idToOpen]['prio'] == 'Medium') {
        document.getElementById('opened-task-prio').classList.add('bg-orange');
    }
    if (tasks[idToOpen]['prio'] == 'Low') {
        document.getElementById('opened-task-prio').classList.add('bg-green');
    }
}


/**
 * Render all subtasks of current task on opened task
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function renderSubtasksOnOpenedTask(idToOpen) {
    let subArea = document.getElementById('subtasks-to-edit');
    subArea.innerHTML = '';

    if (tasks[idToOpen]['subtasks'].length > 0) {
        document.getElementById('opened-task-sub-div').classList.add('d-block');
        for (let s = 0; s < tasks[idToOpen]['subtasks'].length; s++) {
            const subtask = tasks[idToOpen]['subtasks'][s];
            subArea.innerHTML += createSubtasksOnOpenedTask(subtask, s, idToOpen);
            subtasks.push(subtask);
        }
    }
}


/**
 * Close the open task and guid back to beard
 */
function closeTask() {
    document.getElementById('container-opened-task').classList.remove('display-flex');
    // document.getElementById('full-page').classList.remove('overflow-hidden');
    document.getElementById('whole-site').classList.remove('overflow-hidden-1');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML = '';
    init();
}


/**
 * Show the categorys when click on button "Move workspace"
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 */
function showCategorysResponsivness(idToOpen) {
    let area = document.getElementById('move-workspace-category');

    if (area.classList.contains('display-flex')) {
        area.classList.remove('display-flex');
        area.innerHTML = '';
    } else {
        area.classList.add('display-flex');
        area.innerHTML += createWorkspaceCategorys(idToOpen);
        showHookForChoosenWorkspace(idToOpen);
    }
}


/**
 * Show the hook at the workspace category, which is allready choosen
 * 
 * @param {Object} idToOpen - Number of task in json "tasks"  
 */
function showHookForChoosenWorkspace(idToOpen) {
    showHookForWorkspaceToDo(idToOpen);
    showHookForWorkspaceInProgress(idToOpen);
    showHookForWorkspaceAwaitingFeedback(idToOpen);
    showHookForWorkspaceDone(idToOpen);
}


/**
 * Show the hook at workspace 'To do'
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 */
function showHookForWorkspaceToDo(idToOpen) {
    if (tasks[idToOpen]['category'] == 'To do') {
        document.getElementById('category-hook1').classList.add('display-flex');
        document.getElementById('category-hook2').classList.remove('display-flex');
        document.getElementById('category-hook3').classList.remove('display-flex');
        document.getElementById('category-hook4').classList.remove('display-flex');
    }
}


/**
 * Show the hook at workspace 'In Progress'
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 */
function showHookForWorkspaceInProgress(idToOpen) {
    if (tasks[idToOpen]['category'] == 'In Progress') {
        document.getElementById('category-hook2').classList.add('display-flex');
        document.getElementById('category-hook1').classList.remove('display-flex');
        document.getElementById('category-hook3').classList.remove('display-flex');
        document.getElementById('category-hook4').classList.remove('display-flex');
    }
}


/**
 * Show the hook at workspace 'Awaiting Feedback'
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 */
function showHookForWorkspaceAwaitingFeedback(idToOpen) {
    if (tasks[idToOpen]['category'] == 'Awaiting Feedback') {
        document.getElementById('category-hook3').classList.add('display-flex');
        document.getElementById('category-hook1').classList.remove('display-flex');
        document.getElementById('category-hook2').classList.remove('display-flex');
        document.getElementById('category-hook4').classList.remove('display-flex');
    }
}


/**
 * Show the hook at workspace 'Done'
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 */
function showHookForWorkspaceDone(idToOpen) {
    if (tasks[idToOpen]['category'] == 'Done') {
        document.getElementById('category-hook4').classList.add('display-flex');
        document.getElementById('category-hook1').classList.remove('display-flex');
        document.getElementById('category-hook2').classList.remove('display-flex');
        document.getElementById('category-hook3').classList.remove('display-flex');
    }
}


/**
 * Change the workspace category and save in json
 * 
 * @param {Object} idToOpen - Number of task in json "tasks" 
 * @param {string} workspace - Workspace of category the user clicked on 
 */
async function changeWorkspace(idToOpen, workspace) {
    if (workspace == 'To do') {
        tasks[idToOpen]['category'] = [];
        tasks[idToOpen]['category'] = workspace;
    }
    if (workspace == 'In Progress') {
        tasks[idToOpen]['category'] = [];
        tasks[idToOpen]['category'] = workspace;
    }
    if (workspace == 'Awaiting Feedback') {
        tasks[idToOpen]['category'] = [];
        tasks[idToOpen]['category'] = workspace;
    }
    if (workspace == 'Done') {
        tasks[idToOpen]['category'] = [];
        tasks[idToOpen]['category'] = workspace;
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
    showHookForChoosenWorkspace(idToOpen);
}