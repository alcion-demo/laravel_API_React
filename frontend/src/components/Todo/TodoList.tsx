import TodoItem from './TodoItem';
import { useState } from 'react';

type Todo = {
  id: number;
  title: string;
};

type TodoListProps = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    editTodo: (id: number, title: string, completed: boolean) => void;
};

const TodoList = ({ todos, deleteTodo , editTodo }: TodoListProps) => {
  const [keyword, setKeyword] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Todoを検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />

        <button
          onClick={() => setKeyword("")}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          クリア
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;