import { useState } from 'react';

type TodoFormProps = {
  createTodo: (title: string) => Promise<string>;
};

const TodoForm = ({ createTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    const message = await createTodo(title);

    if (message) {
      setError(message);
      return;
    }

    setTitle("");
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todoを入力してください"
          className="flex-1 rounded border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          追加
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TodoForm;