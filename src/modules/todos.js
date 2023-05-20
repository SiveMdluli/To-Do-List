import { addItem, clearCompleted } from './ui-actions.js';

const todoList = document.getElementById('todo-list');
const input = document.getElementById('new-item-input');
const clearCompletedButton = document.getElementById('clear-completed-button');
const addItemButton = document.getElementById('add-item-button');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodoList = () => {
  todoList.innerHTML = '';

  const updatedTodos = clearCompleted(todos);

  updatedTodos.forEach((todo) => {
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

    // Add an event lisnter to the icon
    icon.addEventListener('click', (e) => {
      showOptionsMenu(e);
    });

    function showOptionsMenu(e) {
      const optionsMenus = document.querySelectorAll('.options-menu');
      // Hide all other options menus
      optionsMenus.forEach((menu) => {
        if (menu !== e.target.querySelector('.options-menu')) {
          menu.remove();
        }
      });

      const optionsMenu = document.createElement('div');
      optionsMenu.classList.add('options-menu');

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        editTodo(todo);
        hideOptionsMenu();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo);
        hideOptionsMenu();
      });

      optionsMenu.appendChild(editButton);
      optionsMenu.appendChild(deleteButton);
      e.target.appendChild(optionsMenu);
    }

    function hideOptionsMenu() {
      const optionsMenu = document.querySelector('.options-menu');
      if (optionsMenu !== null) {
        optionsMenu.remove();
      }
    }

    function editTodo(todo) {
      const todoIndex = todo.index;
      input.value = todo.description;
      addItemButton.innerText = 'Save';

      const saveItem = () => {
        todos[todoIndex].description = input.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
        hideOptionsMenu();
        addItemButton.innerText = '+';
        addItemButton.classList.add('plus-on-edit');
        addItemButton.removeEventListener('click', saveItem);
      };

      addItemButton.addEventListener('click', saveItem);
    }

    const deleteTodo = (todo) => {
      const todoIndex = todos.indexOf(todo);
      todos.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    };

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      const hasCompletedTodos = todos.some((todo) => todo.completed);
      clearCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none';
    });

    todosListItem.appendChild(checkboxWrapper);
    todosListItem.appendChild(taskDescription);
    todosListItem.appendChild(icon);
    todoList.appendChild(todosListItem);
  });

  clearCompletedButton.style.display = updatedTodos.some((todo) => todo.completed) ? 'none' : 'block';
  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  addItemButton.addEventListener('click', () => {
    addItem(todos, input, renderTodoList);
  });

  clearCompletedButton.addEventListener('click', () => {
    const newTodos = clearCompleted(todos);
    renderTodoList(newTodos);
  });
};

export { todos, renderTodoList, todoList };
