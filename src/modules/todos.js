// import _ from 'lodash';
import { clearCompletedButton } from './ui.js';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoList = document.getElementById('todo-list');

const renderTodoList = () => {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const taskListItem = document.createElement('li');
    taskListItem.classList.add('task-list-item');

    const checkboxWrapper = document.createElement('label');
    checkboxWrapper.classList.add('checkbox-wrapper');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkmark);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = todo.text;
    if (todo.completed) {
      taskDescription.classList.add('completed');
    }
    const icon = document.createElement('span');
    icon.classList.add('fas', 'fa-ellipsis-v');
    icon.style.color = '#c8ccd0';

    taskListItem.appendChild(checkboxWrapper);
    taskListItem.appendChild(taskDescription);
    taskListItem.appendChild(icon);
    todoList.appendChild(taskListItem);
  });

  //   clearCompletedButton.style.display = todos.some(todo => todo.completed) ? 'block' : 'none';
  clearCompletedButton.style.display = 'block';

  localStorage.setItem('todos', JSON.stringify(todos));
};

export { todos, renderTodoList, todoList };
