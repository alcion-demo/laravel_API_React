import { useState } from 'react';

type Todo = {
  id: number;
  title: string;
};

type TodoItemProps = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={() => {
            editTodo(todo.id, title);
            setIsEditing(false);
          }}>
            保存
          </button>
          <button onClick={() => setIsEditing(false)}>
            キャンセル
          </button>
        </>
      ) : (
        <>
          {todo.title}

            <button onClick={() => {
              setIsEditing(true);
              setTitle(todo.title);
            }}>
            編集
          </button>

          <button onClick={() => deleteTodo(todo.id)}>
            削除
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;