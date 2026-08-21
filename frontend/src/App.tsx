import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Todo = {
    id: number;
    title: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8000/api/todos");
    const data = await res.json();

    setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8000/api/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const editTodo = async (id: number) => {
    await fetch(`http://localhost:8000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    //todoではなく編集中のid初期化
    setEditingId(null);
    setTitle("");

    fetchTodos();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
  };

  const createTodo = async () => {
    await fetch(`http://localhost:8000/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    setTitle("");

    fetchTodos();
  };

  return (
    <>

    <input
      value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "200px" }}
    />

    <button onClick={createTodo} style={{ width: "200px" }}>
      追加
    </button>

      {/* 存在する配列データを表示用のJSXに変換している */}
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.title}

            {
              //編集中かどうか
              editingId === todo.id ? (
                <>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                    <button onClick={() => editTodo(todo.id)}>
                      保存
                  </button>
                  <button onClick={cancelEdit}>
                    キャンセル
                  </button>
                </>
              ) : (
                <button onClick={() => {
                    setEditingId(todo.id);
                    setTitle(todo.title);
                  }}
                >
                    編集
                  </button>
              )
            }

              <button onClick={() => deleteTodo(todo.id)}>
                削除
              </button>
        </div>
      ))}
    </>
  );
}

export default App
