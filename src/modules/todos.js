import { addItem, clearCompleted } from "./ui-actions.js";

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoList = document.getElementById("todo-list");
const input = document.getElementById("new-item-input");
const clearCompletedButton = document.getElementById("clear-completed-button");
const addItemButton = document.getElementById("add-item-button");

const renderTodoList = () => {
  todoList.innerHTML = "";

  const updatedTodos = clearCompleted(todos);
  todos = updatedTodos;

  updatedTodos.forEach((todo) => {
    const todosListItem = document.createElement("li");
    todosListItem.classList.add("task-list-item");

    const checkboxWrapper = document.createElement("label");
    checkboxWrapper.classList.add("checkbox-wrapper");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");

    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkmark);

    const taskDescription = document.createElement("span");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = todo.description;

    if (todo.completed) {
      taskDescription.classList.add("completed");
    }

    const icon = document.createElement("span");
    icon.classList.add("fas", "fa-ellipsis-v");
    icon.style.color = "#c8ccd0";

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      const hasCompletedTodos = todos.some((todo) => todo.completed);
      clearCompletedButton.style.display = hasCompletedTodos ? "block" : "none";
    });

    todosListItem.appendChild(checkboxWrapper);
    todosListItem.appendChild(taskDescription);
    todosListItem.appendChild(icon);
    todoList.appendChild(todosListItem);
  });

  clearCompletedButton.style.display = updatedTodos.some(
    (todo) => todo.completed
  )
    ? "none"
    : "block";
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  addItemButton.addEventListener("click", () => {
    addItem(todos, input, renderTodoList);
  });

  clearCompletedButton.addEventListener("click", () => {
    todos = clearCompleted(todos);
    renderTodoList();
  });
};

export { todos, renderTodoList, todoList };
