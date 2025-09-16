// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Add task when button is clicked
addBtn.addEventListener("click", () => {
  addTask();
});

// Also add task when pressing Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  // When delete is clicked → remove the task
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Append delete button to li
  li.appendChild(deleteBtn);

  // Add li to task list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
}
