const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = taskInput.ariaValueMax.trim();
    const deadline = deadlineInput.ariaValueMax;

    if (taskName === "" || deadline === "") {
        alert("Please fill in all fields!");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        deadline: deadline,
        completed: false
    };

    tasks.push(newTask);

    displayTasks();

    taskInput.value = "";
    deadlineInput.value = "";
});

function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function(task) {
        const li = document.createElement("li");
    
        li.innerHTML = `
            <span> 
                ${task.name} - Due: ${task.deadline}
            </span>

            <button onclick="completeTask(${task.id})">
                ${task.completed ? "Undo" : "Compleye"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.5";
        }

        taskList.appendChild(li);

    });

    updateStats();
}

function completeTask(id) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
}

function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const remaining = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = remaining;
}