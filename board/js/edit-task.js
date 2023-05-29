/**
 * Chacnge the opened task into edit mode
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 * @param {number} id - Id of current task
 */
function editTask(idToOpen, id) {
    let task = document.getElementById(`opened-task${idToOpen}`);
    task.innerHTML = '';
    task.innerHTML += createEditableTask(idToOpen, id);
    let inputDescription = document.getElementById('input-description-edit-task');
    inputDescription.value = '';
    inputDescription.value = tasks[idToOpen]['description'];
    checkForChosenPrioEditTask(idToOpen);
    renderContactsToEdit();
    renderSubtasksOnEditableTask(idToOpen);
    checkForDoneSubtasksToEdited(idToOpen);
    checkForChosenContactsToEdited(idToOpen);
}


/**
 * This function saves the edited task and guide back to the opened task
 * 
 * @param {number} id - Id of current task
 * @param {number} idToOpen - Number of the position in array from current task
 */
async function saveEditedTask(id, idToOpen) {
    tasks[idToOpen]['title'] = document.getElementById('input-title-edit-task').value;
    tasks[idToOpen]['description'] = document.getElementById('input-description-edit-task').value;
    tasks[idToOpen]['due-date'] = document.getElementById('input-date-edit-task').value;
    tasks[idToOpen]['prio'] = chosenPrio;
    tasks[idToOpen]['assigned'] = chosenContacts;
    tasks[idToOpen]['subtasks-done'] = doneSubtasks;

    await backend.setItem('tasks', JSON.stringify(tasks));

    checkPrioForIcon(idToOpen);
    categoryId;
    categoryColor;
    chosenContacts = [];
    doneSubtasks = [];
    openTask(id);
    renderAllTasks();
}

/**
 * Check the priority of the task and assign the icon
 * 
 * @param {number} id - Id of current task
 */
async function checkPrioForIcon(idToOpen) {
    if (chosenPrio == 'Low') {
        tasks[idToOpen]['prio-icon'] = '../img/green-arrows-down.png';
    } else if (chosenPrio == 'Medium') {
        tasks[idToOpen]['prio-icon'] = '../img/orange-lines3.png';
    } else if (chosenPrio == 'Urgent') {
        tasks[idToOpen]['prio-icon'] = '../img/red-arrows-up.png';
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
}


/**
 * Render the available contacts from json at editable task
 */
function renderContactsToEdit() {
    let contactsArea = document.getElementById('all-contacts');
    contactsArea.innerHTML = '';

    for (let c = 0; c < contact.length; c++) {
        const con = contact[c];
        contactsArea.innerHTML += createContactsToEdit(con, c);
    }
}


/**
 * Checks which contacts are chosen at current task and show it with checked checkbox
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function checkForChosenContactsToEdited(idToOpen) {
    for (let i = 0; i < tasks[idToOpen]['assigned'].length; i++) {
        const con = tasks[idToOpen]['assigned'][i];

        let contactToCheck = contact.findIndex(find => find['id'] == con['id']);
        if (contactToCheck > -1) {
            document.getElementById(`checkbox${contactToCheck}`).checked = true;
            chosenContacts.push(con);
        }
    }
}


/**
 * Render all subtasks of current task on editable task
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function renderSubtasksOnEditableTask(idToOpen) {
    let subArea = document.getElementById('subtasks-to-edit1');
    subArea.innerHTML = '';

    document.getElementById('opened-task-sub-div1').classList.add('d-block');
    for (let s = 0; s < tasks[idToOpen]['subtasks'].length; s++) {
        const subtask = tasks[idToOpen]['subtasks'][s];
        subArea.innerHTML += createSubtasksOnEditableTask(subtask, s, idToOpen);
    }

}


/**
 * Create input field to write the name of new subtask
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function createNewSubtask(idToOpen) {
    let subArea = document.querySelector('#subtasks-to-edit1');
    subArea.innerHTML = '';
    subArea.innerHTML += createInputSubtask(idToOpen);
    document.getElementById('subtasks-to-edit1').classList.add('remove-overflow');
    document.getElementById('add-subtask-button').classList.add('d-none');
    document.getElementById('created-new-subtask').focus();

    let sub = document.getElementById('created-new-subtask');

    sub.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.getElementById("hook-button-1").click();
        }
    });
}


/**
 * Cancel the input field for write new subtask
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function cancelSubtaskInput(idToOpen) {
    renderSubtasksOnEditableTask(idToOpen);
    document.getElementById('subtasks-to-edit1').classList.remove('remove-overflow');
    document.getElementById('add-subtask-button').classList.remove('d-none');
}


/**
 * Save the new subtask is json
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
async function saveNewSubtask(idToOpen) {
    let newSubtask = document.getElementById('created-new-subtask').value;
    if (newSubtask.length == 0) {
        document.getElementById('subtask-required-edit').classList.add('display-flex');
    } else {
        let subtask = {
            'subtask': newSubtask,
            'id': new Date().getTime()
        }
        tasks[idToOpen]['subtasks'].push(subtask);
        await backend.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('subtasks-to-edit1').classList.remove('remove-overflow');
        document.getElementById('add-subtask-button').classList.remove('d-none');
        renderSubtasksOnEditableTask(idToOpen);
        checkForDoneSubtasksToEdited(idToOpen);
        subtasks = [];
    }
}


/**
 * Save which subtask is checked and save in json "doneSubtasks"
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 * @param {*} id - Id of the checkbox
 * @param {*} s - Number of the position in array from current subtask
 */
function saveDoneSubtask(idToOpen, id, s) {
    let name = tasks[idToOpen]['subtasks'][s]['subtask'];
    let secondId = tasks[idToOpen]['subtasks'][s]['id'];
    let exist = doneSubtasks.findIndex(search => search['id'] == secondId);
    if (document.getElementById(id).checked && exist == -1) {
        let doneSubtask = {
            'done-subtask': name,
            'id': secondId
        }
        doneSubtasks.push(doneSubtask);
    } else {
        doneSubtasks.splice(exist, 1);
    }
}


/**
 * Check which subtasks are already done and check the checkboxes
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function checkForDoneSubtasksToEdited(idToOpen) {
    for (let i = 0; i < tasks[idToOpen]['subtasks-done'].length; i++) {
        let sub = tasks[idToOpen]['subtasks-done'][i];

        let number = tasks[idToOpen]['subtasks'].findIndex(find => find['id'] == sub['id']);
        if (number > -1) {
            document.getElementById(`checkbox-sub${number}`).checked = true;
            doneSubtasks.push(sub);
        }
    }
}


/**
 * Delete a subtask
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 * @param {*} s - Number of the position of subtask in json
 */
async function deleteSubtask(idToOpen, s) {
    document.getElementById('subtasks-to-edit1').classList.add('disabled-div');
    let id = tasks[idToOpen]['subtasks'][s]['id'];
    tasks[idToOpen]['subtasks'].splice(s, 1);
    if (tasks[idToOpen]['subtasks-done'].length > 0) {
        let doneSub = doneSubtasks.findIndex(find => find['id'] == id);
        let subtaskToFind = tasks[idToOpen]['subtasks-done'].findIndex(find => find['id'] == id);
        doneSubtasks.splice(doneSub, 1);
        tasks[idToOpen]['subtasks-done'].splice(subtaskToFind, 1);
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
    renderSubtasksOnEditableTask(idToOpen);
    document.getElementById('subtasks-to-edit1').classList.remove('disabled-div');
}


/**
 * Check the chosen priority of current task and change color of div and icon on editable task 
 * 
 * @param {number} idToOpen - Number of the position in array from current task
 */
function checkForChosenPrioEditTask(idToOpen) {
    if (tasks[idToOpen]['prio'] == 'Urgent') {
        document.getElementById('prio-div1').classList.add('bg-red');
        document.getElementById('prio-img1').classList.add('become-white');
        chosenPrio = 'Urgent';
    }
    if (tasks[idToOpen]['prio'] == 'Medium') {
        document.getElementById('prio-div2').classList.add('bg-orange');
        document.getElementById('prio-img2').classList.add('become-white');
        chosenPrio = 'Medium';
    }
    if (tasks[idToOpen]['prio'] == 'Low') {
        document.getElementById('prio-div3').classList.add('bg-green');
        document.getElementById('prio-img3').classList.add('become-white');
        chosenPrio = 'Low';
    }
}


/**
 * Check if input field is empty, if no --> save the subtask and show it for the user in front end
*/
function setNewSubtask() {

    let sub = document.getElementById('new-subtask').value;
    let newSubtask = document.getElementById('new-subtask-div');

    if (sub.length == 0) {
        document.getElementById('subtask-required').classList.add('display-flex');
    } else {
        newSubtask.innerHTML += newCheckBox(sub);

        let subtask = {
            'subtask': sub,
            'id': new Date().getTime()
        }

        subtasks.push(subtask);

        let input = document.getElementById('subtask-div');
        input.innerHTML = '';
        input.innerHTML += createOldSubtastInput();
        document.getElementById('subtask-required').classList.remove('display-flex');
    }
}