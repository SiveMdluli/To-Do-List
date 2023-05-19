// import _ from 'lodash';
import { todos, renderTodoList, todoList } from './todos.js';
import { addItem, clearCompleted } from './ui-actions.js';

const clearCompletedButton = document.getElementById('clear-completed-button');
const newItemInput = document.getElementById('new-item-input');
const addItemButton = document.getElementById('add-item-button');

const initializeUI = () => {
  renderTodoList();

  addItemButton.addEventListener('click', (event) => {
    event.preventDefault();
    addItem(todos, newItemInput, renderTodoList);
  });

  todoList.addEventListener('change', (event) => {
    const checkbox = event.target;
    const taskDescription = checkbox.nextSibling;

    const todo = todos.find(
      (todo) => todo.text === taskDescription.textContent,
    );

    if (todo) {
      todo.completed = checkbox.checked;
      renderTodoList();
    }
  });

  clearCompletedButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearCompleted(todos, renderTodoList);
  });
};

export { clearCompletedButton };
export { initializeUI };
