const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

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

    saveTasks();
    displayTasks();

    taskInput.value = "";
    deadlineInput.value = "";
});

function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function(task) {
        const li = document.createElement("li");
    
        const taskText = document.createElement("span");
        taskText.textContent = `${task.name} - Due: ${task.deadline}`;

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            completeTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.5";
        }

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

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

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
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