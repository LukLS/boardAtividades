const tasks = [];

const taskListContainer = document.getElementById("task-list-container");
const tasksSummary = document.getElementById("tasks-summary");
const addTaskForm = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name-input");
const taskTagInput = document.getElementById("task-tag-input");
const completedTasksCountSpan = document.getElementById("completed-tasks-count");
const pluralTasksTextSpan = document.getElementById("plural-tasks-text");
const pluralCompletedTextSpan = document.getElementById("plural-completed-text");

function createTaskElement(task, index) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    if (task.concluida) {
        taskCard.classList.add("completed");
    }

    const taskContentDiv = document.createElement("div");
    taskContentDiv.classList.add("task-content-wrapper");

    const taskTitleText = document.createElement("p");
    taskTitleText.classList.add("task-title-text");
    taskTitleText.textContent = task.nome;
    if (task.concluida) {
        taskTitleText.classList.add("strike-through");
    }

    const taskMetaInfoDiv = document.createElement("div");
    taskMetaInfoDiv.classList.add("task-meta-info");

    const tagSpan = document.createElement("span");
    tagSpan.classList.add("task-tag-label");
    const normalizedTag = task.etiqueta.toLowerCase();
    if (normalizedTag === 'frontend') {
        tagSpan.classList.add('frontend');
    } else if (normalizedTag === 'backend') {
        tagSpan.classList.add('backend');
    } else if (normalizedTag === 'ux') {
        tagSpan.classList.add('ux');
    } else {
        tagSpan.classList.add('default');
    }
    tagSpan.textContent = task.etiqueta;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("task-creation-date");
    dateSpan.textContent = `Criado em: ${task.data}`;

    taskMetaInfoDiv.appendChild(tagSpan);
    taskMetaInfoDiv.appendChild(dateSpan);

    taskContentDiv.appendChild(taskTitleText);
    taskContentDiv.appendChild(taskMetaInfoDiv);

    let actionElement;
    if (!task.concluida) {
        actionElement = document.createElement("button");
        actionElement.classList.add("complete-task-button");
        actionElement.textContent = "Concluir";
        actionElement.addEventListener('click', () => toggleTaskCompleted(index));
    } else {
        actionElement = document.createElement("div");
        actionElement.classList.add("completed-icon");
        actionElement.innerHTML = "&#10003;";
    }

    taskCard.appendChild(taskContentDiv);
    taskCard.appendChild(actionElement);

    return taskCard;
}

function renderTasks() {
    taskListContainer.innerHTML = "";
    tasks.forEach((tarefa, index) => {
        const taskElement = createTaskElement(tarefa, index);
        taskListContainer.appendChild(taskElement);
    });
    updateCompletedCounter();
}

function toggleTaskCompleted(index) {
    tasks[index].concluida = !tasks[index].concluida;
    renderTasks();
}

function updateCompletedCounter() {
    const completedCount = tasks.filter(t => t.concluida).length;
    completedTasksCountSpan.textContent = completedCount;

    if (completedCount === 1) {
        pluralTasksTextSpan.textContent = '';
        pluralCompletedTextSpan.textContent = '';
    } else {
        pluralTasksTextSpan.textContent = 's';
        pluralCompletedTextSpan.textContent = 's';
    }
}

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = taskNameInput.value.trim();
    const tag = taskTagInput.value.trim() || "geral";
    const currentDate = new Date().toLocaleDateString("pt-BR");

    if (name) {
        const newTask = {
            id: Date.now(),
            nome: name,
            etiqueta: tag,
            data: currentDate,
            concluida: false
        };
        tasks.push(newTask);
        addTaskForm.reset();
        renderTasks();
    } else {
        alert("Por favor, digite o nome da tarefa!");
    }
});

document.addEventListener('DOMContentLoaded', renderTasks);