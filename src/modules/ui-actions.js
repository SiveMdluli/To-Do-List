const addItem = (todos, input, render) => {
  const newItemText = input.value.trim();

  if (newItemText === '') {
    return;
  }

  const newTodo = {
    description: newItemText,
    completed: false,
    index: todos.length,
  };

  todos.push(newTodo);
  input.value = '';
  render();
};

// const clearCompleted = (todos) => {
//   const updatedTodos = todos.filter((todo) => !todo.completed);
//   localStorage.setItem('todos', JSON.stringify(updatedTodos));
//   return updatedTodos;
// };

const clearCompleted = (todos) => todos.filter((todo) => {
  if (todo && todo.completed) {
    return false;
  }
  return true;
});

export { addItem, clearCompleted };