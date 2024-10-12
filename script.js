// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add event listener to the form to handle new tasks
todoForm.addEventListener('submit', addTodo);

// Load saved todos from localStorage
function loadTodos() {
  const todos = getTodosFromLocalStorage();
  console.log("Loaded todos from localStorage:", todos);  // Check what's loaded

  todos.forEach(todo => {
    createTodoItem(todo.text, todo.completed);
  });
}

// Add a new task to the list
function addTodo(event) {
  event.preventDefault();  // Prevent form from refreshing the page
  console.log("Add Todo function triggered");  // Debug log

  const todoText = todoInput.value.trim();  // Get input value
  console.log("Todo text:", todoText);  // Debug log

  if (todoText !== '') {
    createTodoItem(todoText, false);   // Add task to the UI
    saveTodoInLocalStorage(todoText, false);  // Save task in localStorage
    todoInput.value = '';  // Clear the input field after adding
  }
}

// Create a new todo item element
function createTodoItem(todoText, isCompleted) {
    const li = document.createElement('li');
    
    // Only add the 'completed' class if the task is completed
    if (isCompleted) {
      li.classList.add('completed');
    }
  
    li.innerHTML = `
      <span>${todoText}</span>
      <button class="delete-btn">Delete</button>
    `;
  
    // Mark task as completed on click
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      updateTodoInLocalStorage(todoText);
    });
  
    // Handle task deletion
    li.querySelector('.delete-btn').addEventListener('click', function (e) {
      e.stopPropagation();  // Prevent completing the task when delete is clicked
      removeTodoFromLocalStorage(todoText);
      todoList.removeChild(li);
    });
  
    // Add the task to the list
    todoList.appendChild(li);
  }
  

// Get todos from localStorage
function getTodosFromLocalStorage() {
  let todos = localStorage.getItem('todos');
  console.log("Retrieved todos from localStorage:", todos);  // Debug log
  return todos ? JSON.parse(todos) : [];
}

// Save a new todo in localStorage
function saveTodoInLocalStorage(todoText, isCompleted) {
  const todos = getTodosFromLocalStorage();
  todos.push({ text: todoText, completed: isCompleted });
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log("Saved todo in localStorage:", todos);  // Debug log
}

// Update todo status (completed or not) in localStorage
function updateTodoInLocalStorage(todoText) {
  const todos = getTodosFromLocalStorage();
  const todo = todos.find(todo => todo.text === todoText);

  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// Remove todo from localStorage
function removeTodoFromLocalStorage(todoText) {
  let todos = getTodosFromLocalStorage();
  todos = todos.filter(todo => todo.text !== todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log("Removed todo from localStorage:", todos);  // Debug log
}
