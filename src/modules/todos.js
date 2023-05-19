// import _ from 'lodash';
import { clearCompletedButton } from './ui.js';

const todos = [
  {
    description: 'Create a dance style to scynchonously jam to the sound of a washing machine.',
    completed: false,
    index: 0,
  },
  {
    description: 'Program a script that can translate thoughts into code.',
    completed: true,
    index: 1,
  },
  {
    description: 'Create an app that generates random programming pickup lines.',
    completed: false,
    index: 2,
  },
];

const todoList = document.getElementById('todo-list');

const renderTodoList = () => {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const todosListItem = document.createElement('li');
    todosListItem.classList.add('task-list-item');

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
    taskDescription.textContent = todo.description;
    if (todo.completed) {
      taskDescription.classList.add('completed');
    }
    const icon = document.createElement('span');
    icon.classList.add('fas', 'fa-ellipsis-v');
    icon.style.color = '#c8ccd0';

    todosListItem.appendChild(checkboxWrapper);
    todosListItem.appendChild(taskDescription);
    todosListItem.appendChild(icon);
    todoList.appendChild(todosListItem);
  });

  clearCompletedButton.style.display = 'block';

  localStorage.setItem('todos', JSON.stringify(todos));
};

export { todos, renderTodoList, todoList };
