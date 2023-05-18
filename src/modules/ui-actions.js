// import _ from 'lodash';

const addItem = (todos, input, render) => {
  const newItemText = input.value.trim();

  if (newItemText === '') {
    return;
  }

  const newTodo = {
    id: todos.length + 1,
    text: newItemText,
    completed: false,
  };

  todos.push(newTodo);
  input.value = '';
  render();
};

const clearCompleted = (todos, render) => {
  todos = todos.filter((todo) => !todo.completed);
  render();
};

export { addItem, clearCompleted };
