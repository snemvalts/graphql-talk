type Todo = {
  id: number;
  name: string;
  done: boolean;
};

const todos: Todo[] = [{ id: 1, name: 'Tere!', done: false }];

export const getTodos = () => todos;

export const addTodo = (todo: Omit<Todo, 'id'>) => {
  const id = Math.max(...todos.map((todo) => todo.id)) + 1;
  todos.push({
    id,
    ...todo,
  });

  return todos;
};

export const deleteTodo = (todoId: Todo['id']) => {
  const idx = todos.findIndex((todo) => todo.id === todoId);
  todos.splice(idx, 1);

  return todos;
};
