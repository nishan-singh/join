let tasks = [{
    'title': 'Website redisign',
    'description': 'Modify the contents of the main website',
    'category': 'To do',
    'workspace-category': 'Design',
    'assigned': 'Max Mustermann',
    'due-date': '',
    'prio': 'medium',
    'prio-icon': '../img/orange-lines.png',
    'prio-icon-white': '../img/orange-lines3.png',
    'id': '0'
}, {
    'title': 'Accounting invoices',
    'description': 'Write open invoices for customers',
    'category': 'In Progress',
    'workspace-category': 'Backoffice',
    'assigned': 'Max Mustermann',
    'due-date': '',
    'prio': 'urgent',
    'prio-icon': '../img/red-arrows.png',
    'prio-icon-white': '../img/red-arrows-up.png',
    'id': '1'
}, {
    'title': 'Call potencial clients',
    'description': 'Make the product presentation to procspective buyers',
    'category': 'Awaiting Feedback',
    'workspace-category': 'Sales',
    'assigned': 'Max Mustermann',
    'due-date': '',
    'prio': 'medium',
    'prio-icon': '../img/orange-lines.png',
    'prio-icon-white': '../img/orange-lines3.png',
    'id': '2'
}, {
    'title': 'Social media strategy',
    'description': 'Develop an a compaign for brand positioning',
    'category': 'Done',
    'workspace-category': 'Marketing',
    'assigned': 'Max Mustermann',
    'due-date': '',
    'prio': 'Low',
    'prio-icon': '../img/green-arrows.png',
    'prio-icon-white': '../img/green-arrows-down.png',
    'id': '3'
}];

let currentDraggedElement;
let categoryId;
let chosenPrio;
let prioIcon;
let prioIconWhite;
let currentChosenCategory;

setURL('https://gruppenarbeit-join-454.developerakademie.net/smallest_backend_ever/');

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    subtasks = JSON.parse(backend.getItem('subtasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];
    chosenContacts = JSON.parse(backend.getItem('chosenContacts')) || [];
    idOfCurrentTask = JSON.parse(backend.getItem('idOfCurrentTask')) || [];
    renderAllTasks();
}


function renderAllTasks() {
    renderWorkspace('To do', 'to-do-area');
    renderWorkspace('In Progress', 'in-progress-area');
    renderWorkspace('Awaiting Feedback', 'awaiting-feedback-area');
    renderWorkspace('Done', 'done-area');
}


function renderWorkspace(category, id) {
    for (let t = 0; t < tasks.length; t++) {
        let filteredItems = tasks.filter(t => t['category'] == category)

        document.getElementById(id).innerHTML = '';

        for (let i = 0; i < filteredItems.length; i++) {
            let element = filteredItems[i];
            document.getElementById(id).innerHTML += createTodo(element, t);
            createProgressBarForTask(element);
        }

    }


}


async function addNewTask() {
    let title = document.getElementById('input-title').value;
    let description = document.getElementById('input-description').value;
    let workspaceCategory = categoryId;
    let date = document.getElementById('input-date').value;
    idOfCurrentTask[0]++;
    await backend.setItem('idOfCurrentTask', JSON.stringify(idOfCurrentTask));
    let id = idOfCurrentTask[0];

    let task = {
        'title': title,
        'description': description,
        'category': currentChosenCategory,
        'workspace-category': workspaceCategory,
        'assigned': chosenContacts,
        'due-date': date,
        'prio': chosenPrio,
        'subtasks': subtasks,
        'prio-icon': prioIcon,
        'prio-icon-white': prioIconWhite,
        'id': id
    }

    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    cancelNewTask();
    closeAddTask();
    init();
}


async function deleteTask(id) {
    tasks.splice(id, 1);
    await backend.setItem('tasks', JSON.stringify(tasks));
    closeTask();
    renderAllTasks();
}


function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(`task${id}`).classList.add('move-task');
}


async function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    renderAllTasks();
    await backend.setItem('tasks', JSON.stringify(tasks));
}


function allowDrop(ev) {
    ev.preventDefault();
}


function createProgressBarForTask(element) {
    showProgressBar(element, 'To do', 'width: 0%', '0');
    showProgressBar(element, 'In Progress', 'width: 33%', '1');
    showProgressBar(element, 'Awaiting Feedback', 'width: 66%', '2');
    showProgressBar(element, 'Done', 'width: 100%', '3');
}


function showProgressBar(element, category, width, number) {
    if (element['category'] == category) {
        document.getElementById(`progress-bar${element['id']}`).style = width;
        let text = document.getElementById(`progress-bar-text${element['id']}`);
        text.innerHTML = '';
        text.innerHTML += `${number}/3 Done`;
    }
}


function highlight(id) {
    document.getElementById(id).classList.add('highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('highlight');
}


function filterAllWorkspaces() {
    filterWorkspace('To do', 'to-do-area');
    filterWorkspace('In Progress', 'in-progress-area');
    filterWorkspace('Awaiting Feedback', 'awaiting-feedback-area');
    filterWorkspace('Done', 'done-area');
}


function filterWorkspace(category, id) {
    let filteredItems = tasks.filter(t => t['category'] == category);
    let search = document.getElementById('search-tasks').value;
    search = search.toLowerCase();

    let area = document.getElementById(id);
    area.innerHTML = '';

    setFilter(filteredItems, search, area);
}


function setFilter(filteredItems, search, area) {
    if (search) {
        for (let i = 0; i < filteredItems.length; i++) {
            let element = filteredItems[i];

            if (element['title'].toLowerCase().includes(search) || element['description'].toLowerCase().includes(search)) {
                area.innerHTML += createTodo(element);
                createProgressBarForTask(element);
            }
        }
    }
    if (search.length == '') {
        renderAllTasks();
    }
}

function openTask(id) {
    document.getElementById('container-opened-task').classList.add('d-flex');
    document.getElementById('whole-site').classList.add('overflow-hidden');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML += createOpenedTask(id);
}


function closeTask() {
    document.getElementById('container-opened-task').classList.remove('d-flex');
    document.getElementById('whole-site').classList.remove('overflow-hidden');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML = '';
}


function addTask(currentCategory) {
    currentChosenCategory = currentCategory;
    document.getElementById('container-opened-task').classList.add('d-flex');
    document.getElementById('whole-site').classList.add('overflow-hidden');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML += createAddTaskWindow();
}


function closeAddTask() {
    document.getElementById('container-opened-task').classList.remove('d-flex');
    document.getElementById('whole-site').classList.remove('overflow-hidden');
    let boardArea = document.getElementById('container-opened-task');
    boardArea.innerHTML = '';
}


function setBorder(id, prio) {
    document.getElementById(id).classList.add('set-border');
    checkPrioUrgent(id, prio);
    checkPrioMedium(id, prio);
    checkPrioLow(id, prio);
}


function checkPrioUrgent(id, prio) {
    if (id == 'prio-div1') {
        document.getElementById('prio-div2').classList.remove('set-border');
        document.getElementById('prio-div3').classList.remove('set-border');
        chosenPrio = prio;
        prioIcon = '../img/red-arrows.png';
        prioIconWhite = '../img/red-arrows-up.png';
    }
}


function checkPrioMedium(id, prio) {
    if (id == 'prio-div2') {
        document.getElementById('prio-div1').classList.remove('set-border');
        document.getElementById('prio-div3').classList.remove('set-border');
        chosenPrio = prio;
        prioIcon = '../img/orange-lines.png';
        prioIconWhite = '../img/orange-lines3.png';
    }
}


function checkPrioLow(id, prio) {
    if (id == 'prio-div3') {
        document.getElementById('prio-div1').classList.remove('set-border');
        document.getElementById('prio-div2').classList.remove('set-border');
        chosenPrio = prio;
        prioIcon = '../img/green-arrows.png';
        prioIconWhite = '../img/green-arrows-down.png';
    }
}


function removeAllBorders() {
    document.getElementById('prio-div1').classList.remove('set-border');
    document.getElementById('prio-div2').classList.remove('set-border');
    document.getElementById('prio-div3').classList.remove('set-border');
}


function changeSubtaskInput() {
    let input = document.getElementById('subtask-div');
    input.innerHTML = '';
    input.innerHTML += createNewSubtastInput();
}


function showOldInput() {
    let input = document.getElementById('subtask-div');
    input.innerHTML = '';
    input.innerHTML += createOldSubtastInput();
}


async function setNewSubtask() {
    let sub = document.getElementById('new-subtask').value;
    let newSubtask = document.getElementById('new-subtask-div');
    newSubtask.innerHTML += newCheckBox(sub);
    subtasks.push(sub);

    let input = document.getElementById('subtask-div');
    input.innerHTML = '';
    input.innerHTML += createOldSubtastInput();
}


function showContacts() {
    let contacts = document.getElementById('all-contacts');

    if (contacts.classList.contains('d-flex')) {
        contacts.classList.remove('d-flex');
        contacts.innerHTML = '';
        document.getElementById('drop-down-box').classList.remove('padding-bottom');
    } else {
        contacts.classList.add('d-flex');

        for (let c = 0; c < contact.length; c++) {
            const con = contact[c];
            contacts.innerHTML += createContacts(con, c);
        }
        document.getElementById('drop-down-box').classList.add('padding-bottom');
    }
}


function checkIfChecked(id, c) {
    let firstName = contact[c]['first-name'];
    let lastName = contact[c]['last-name'];

    if (document.getElementById(id).checked) {
        let names = {
            'first-name': firstName,
            'last-name': lastName
        }
        chosenContacts.push(names);
    }
}


function showCategorys() {
    let categorys = document.getElementById('all-categorys');

    if (categorys.classList.contains('d-flex')) {
        categorys.classList.remove('d-flex');
        categorys.innerHTML = '';
        document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    } else {
        categorys.classList.add('d-flex');
        categorys.innerHTML += createCategorys();
        document.getElementById('drop-down-box1').classList.add('padding-bottom');
    }
}


function setCategory(category) {
    document.getElementById('all-categorys').classList.remove('d-flex');
    document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    document.getElementById('select-category').innerHTML = '';
    document.getElementById('select-category').innerHTML += showChosenCategory(category);
    categoryId = document.getElementById('chosen-category').innerHTML;
}


function createNewCategory() {
    document.getElementById('all-categorys').classList.remove('d-flex');
    document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    document.getElementById('drop-down-box1').innerHTML = '';
    document.getElementById('drop-down-box1').innerHTML += showInputNewCategory();


    if (document.getElementById('colors-new-category').classList.contains('d-none')) {
        document.getElementById('colors-new-category').classList.remove('d-none');
    } else {
        document.getElementById('colors-new-category').innerHTML += createColorPicker();
    }
}


function saveNewCategory() {
    document.getElementById('hook-category').classList.add('d-none');
    document.getElementById('border-line').classList.add('d-none');
    document.getElementById('x-mark-new-cat').classList.add('padding-left-30');
    categoryId = document.getElementById('input-new-cat').value;
}


function choseColor(className) {
    document.getElementById('colors-new-category').classList.add('d-none');
    document.getElementById('color-div-new').innerHTML += showChosenColor(className);

}


function createOldCategorys() {
    document.getElementById('colors-new-category').classList.add('d-none');
    document.getElementById('drop-down-box1').innerHTML = '';
    document.getElementById('drop-down-box1').innerHTML += showOldCategorys();
}

function cancelNewTask() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    createOldCategorys();
    document.getElementById('all-contacts').classList.remove('d-flex');
    document.getElementById('drop-down-box').classList.remove('padding-bottom');
    document.getElementById('input-date').value = '';
    removeAllBorders();
    document.getElementById('new-subtask-div').innerHTML = '';
}