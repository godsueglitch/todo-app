const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos on page load
window.onload = () => {
  renderTodos();
};

// Add a new todo
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  saveTodos();
  renderTodos();

  todoInput.value = "";
}

// Toggle done state
function toggleDone(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos();
  renderTodos();
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render the todo list
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm";

    li.innerHTML = `
      <span onclick="toggleDone(${todo.id})" class="cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}">
        ${todo.text}
      </span>
      <button onclick="deleteTodo(${todo.id})" class="text-red-500 hover:text-red-700">✕</button>
    `;

    todoList.appendChild(li);
  });
}
