import TodoItem from './TodoItem';

type Todo = {
  id: number;
  title: string;
};

type TodoListProps = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    editTodo: (id: number) => void;
};

const TodoList = ({ todos, deleteTodo , editTodo }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </>
  );
};

export default TodoList;