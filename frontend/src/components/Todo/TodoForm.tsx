type TodoFormProps = {
  title: string;
  setTitle: (title: string) => void;
  error: string;
  createTodo: () => void;
};

const TodoForm = ({
  title,
  setTitle,
  error,
  createTodo,
}: TodoFormProps) => {

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "200px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={createTodo} style={{ width: "200px" }}>
        追加
      </button>
    </div>
  );
};

export default TodoForm;