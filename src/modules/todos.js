import { addItem, clearCompleted } from './ui-actions.js';

const todoList = document.getElementById('todo-list');
const input = document.getElementById('new-item-input');
const clearCompletedButton = document.getElementById('clear-completed-button');
const addItemButton = document.getElementById('add-item-button');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodoList = () => {
  todoList.innerHTML = '';

  const updatedTodos = clearCompleted(todos);

  updatedTodos.forEach((todo, index) => {
    const todosListItem = document.createElement('li');
    todosListItem.classList.add('task-list-item');
    todosListItem.setAttribute('draggable', true);
    todosListItem.dataset.index = index;

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

    icon.addEventListener('click', (e) => {
      showOptionsMenu(e, index);
    });

    function showOptionsMenu(e, index) {
      const optionsMenus = document.querySelectorAll('.options-menu');

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
        editTodo(todo, index);
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

    function editTodo(todo, index) {
      if (todo !== undefined) {
        input.value = todo.description;

        const saveItem = () => {
          if (input.value !== '') {
            // Updating the description of the existing todo at index
            todos[index].description = input.value;
          } else {
            // Here I remove the todo at index
            todos.splice(index, 1);
          }

          localStorage.setItem('todos', JSON.stringify(todos));
          renderTodoList();
          hideOptionsMenu();
          addItemButton.innerText = '+';
          addItemButton.classList.add('plus-on-edit');
          addItemButton.removeEventListener('click', saveItem);
        };

        addItemButton.addEventListener('click', saveItem);
        todosListItem.classList.remove('edited');
      } else {

      }
    }

    const deleteTodo = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    };

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      const hasCompletedTodos = todos.some((todo) => todo.completed);
      clearCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none';
    });

    todosListItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.clearData();
      event.dataTransfer.setData('text/plain', event.target.dataset.index);
    });

    todosListItem.addEventListener('dragend', (event) => {
      event.preventDefault();
      const updatedListItems = document.querySelectorAll('.task-list-item');
      updatedListItems.forEach((listItem) => listItem.classList.remove('dragging'));
    });

    todosListItem.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    todosListItem.addEventListener('drop', (event) => {
      event.preventDefault();
      const dropIndex = event.target.dataset.index;
      const dragIndex = event.dataTransfer.getData('text/plain');
      if (todos[dropIndex] !== undefined) {
        const dropTodo = todos[dropIndex];
        todos[dropIndex] = todos[dragIndex];
        todos[dragIndex] = dropTodo;

        // Update the data-index attribute of the affected todosListItem elements
        const updatedListItems = document.querySelectorAll('.task-list-item');
        updatedListItems[dragIndex].dataset.index = dropIndex;
        updatedListItems[dropIndex].dataset.index = dragIndex;

        renderTodoList();
      }
    });

    todosListItem.appendChild(checkboxWrapper);
    todosListItem.appendChild(taskDescription);
    todosListItem.appendChild(icon);
    todoList.appendChild(todosListItem);
  });

  clearCompletedButton.style.display = updatedTodos.some((todo) => todo.completed) ? 'block' : 'none';
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