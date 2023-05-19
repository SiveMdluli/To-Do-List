const addItem = (todos, input, render) => {
  const newItemText = input.value.trim();

  if (newItemText === "") {
    return;
  }

  const newTodo = {
    description: newItemText,
    completed: false,
    index: todos.length,
  };

  todos.push(newTodo);
  input.value = "";
  render();
};

const clearCompleted = (todos) => {
  const updatedTodos = todos.filter((todo) => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodos;
};

export { addItem, clearCompleted };
