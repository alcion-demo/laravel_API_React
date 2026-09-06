import { useState } from 'react';

type Todo = {
  id: number;
  title: string;
};

type TodoItemProps = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, completed: boolean) => Promise<string>;
};

const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [editError, setEditError] = useState("");

  const handleEdit = async () => {
    setEditError("");

    const message = await editTodo(todo.id, title, false);

    if (message) {
      setEditError(message);
      return;
    }

    setIsEditing(false)
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 last:border-b-0">
      {isEditing ? (
        <>
          <div className="flex-1">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {editError && (
              <p className="text-sm text-red-500">
                {editError}
              </p>
              )}
            </div>

          <div className="ml-3 flex shrink-0 gap-2">
            <button
              onClick={handleEdit}
              className="rounded bg-green-500 px-3 py-1.5 text-sm text-white hover:bg-green-600"
            >
              保存
            </button>

            <button
              onClick={() => {
                setEditError("");
                setIsEditing(false);
              }}
              className="rounded bg-gray-400 px-3 py-1.5 text-sm text-white hover:bg-gray-500"
            >
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="flex-1 text-left text-gray-800">
            {todo.title}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditError("");
                setIsEditing(true);
                setTitle(todo.title);
              }}
              className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
            >
              編集
            </button>

            <button
                onClick={() => {
                    if (window.confirm('このTodoを削除しますか？')) {
                      deleteTodo(todo.id);
                    }
              }}
              className="rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;