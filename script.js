// Theme Toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";

  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️ Light Mode";
}

// Date Display
const dateElement = document.getElementById("current-date");
const today = new Date();
dateElement.textContent = today.toDateString();

// Task handling
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const clearTasksBtn = document.getElementById("clear-tasks");
const searchInput = document.getElementById("search");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "") {
  taskList.innerHTML = "";
  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task" + (task.completed ? " completed" : "");

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
        <span>${task.text}</span>
        <small>${task.date}</small>
        <button onclick="deleteTask(${index})">❌</button>
      `;

      taskList.appendChild(li);
    });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (taskInput.value.trim() === "") return;

  const task = {
    text: taskInput.value,
    completed: false,
    date: new Date().toLocaleString()
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(searchInput.value);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(searchInput.value);
}

function clearTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

addTaskBtn.addEventListener("click", addTask);
clearTasksBtn.addEventListener("click", clearTasks);
searchInput.addEventListener("input", () => renderTasks(searchInput.value));

// First render
renderTasks();
