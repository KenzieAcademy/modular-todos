/* Elements */
const todoContainer = document.querySelector("#todos");
const todoFilter = document.querySelector("select");
const todoInput = document.querySelector("input");

/* Helper Functions */

// remove all children from todo container
function clearTodos() {
  while(todoContainer.lastChild) {
    todoContainer.removeChild(todoContainer.lastChild);
  }
}

// given an array of todo objects, render each todo as a label with
// a checkbox and text
function renderTodos(todos) {
  clearTodos();
  todos.forEach((todo, i) => {
    // create the label
    const todoComponent = document.createElement("label");
    todoComponent.innerHTML = `
      <input
        id=checkbox-${todo.id}
        type="checkbox"
        ${todo.complete ? "checked" : ""}
      >${todo.description}
    `;
    // add the label to the DOM
    todoContainer.appendChild(todoComponent);
    // select the checkbox inside the label and attach a change event to it
    checkbox = document.querySelector(`#checkbox-${todo.id}`);
    checkbox.addEventListener("change", e => {
      markTodo(todo.id, e.target.checked);
    });
  });
}

/* API Calls */

// URL that all API calls start with
const baseUrl = "http://localhost:3000/todos";

// get all todos that match the filter (no filter, completed, incomplete)
function getTodos(filter = "") {
  const url = `${baseUrl}/${filter}`;
  fetch(url)
    .then(response => response.json())
    .then(todos => {
      renderTodos(todos);
    });
}

// mark a todo as complete or incomplete given the value of `mark`
function markTodo(id, mark) {
  const url = `${baseUrl}/${id}`
  fetch(url, {
    method: "PATCH",
    // for non GET/POST requests, we need cors, so we have to enable it in the
    // request
    type: "cors",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      complete: mark
    })
  })
  .then(() => getTodos());
}

// create a new todo
function createTodo(todo) {
  fetch(baseUrl, {
    method: "POST",
    // we need to specify that we are sending JSON to the server
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(todo)
  })
    .then(response => response.json())
    .then(() => {
      getTodos();
    });
}

/* Event Listeners */

// change which todos are displayed based on the filter
todoFilter.addEventListener("change", e => {
  getTodos(e.target.value);
});

// create a new todo when the Enter key is pressed
todoInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    createTodo({description: e.target.value});
  }
});

// bootstrap the application
getTodos(todoFilter.value);
