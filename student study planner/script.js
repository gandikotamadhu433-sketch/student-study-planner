let tasks = [];

function addTask() {

    const subject = document.getElementById("subject").value;
    const topic = document.getElementById("topic").value;
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (subject === "" || topic === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    const task = {
        id: Date.now(),
        subject: subject,
        topic: topic,
        date: date,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    displayTasks();
    updateProgress();
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty">No study tasks added yet.</p>';
        return;
    }

    tasks.forEach(task => {

        const taskDiv = document.createElement("div");

        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <div class="task-info ${task.completed ? 'completed' : ''}">
                <h3>${task.subject}</h3>
                <p><strong>Topic:</strong> ${task.topic}</p>
                <p><strong>Date:</strong> ${task.date}</p>
                <p class="${task.priority.toLowerCase()}">
                    ${task.priority} Priority
                </p>
            </div>

            <div>
                <button class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

function completeTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    displayTasks();
    updateProgress();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    displayTasks();
    updateProgress();
}

function updateProgress() {

    if (tasks.length === 0) {
        document.getElementById("progressBar").style.width = "0%";
        document.getElementById("progressText").innerText =
            "0% Completed";
        return;
    }

    const completedTasks =
        tasks.filter(task => task.completed).length;

    const percentage =
        Math.round((completedTasks / tasks.length) * 100);

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").innerText =
        percentage + "% Completed";
}