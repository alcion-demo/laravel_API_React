import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './login';
import { apiFetch } from './utils/apiFetch';
import './App.css'

type Todo = {
    id: number;
    title: string;
};

const App = () => {

  //ログイン状態取得
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  const fetchTodos = async () => {
      const response = await apiFetch('/api/todos');

      const data = await response.json();

      console.log('todos:', data);

      setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    const response = await apiFetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log('delete:', response.status, data);

    if (!response.ok) {
        return;
    }

    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const editTodo = async (id: number) => {
    const response = await apiFetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    const data = await response.json();

    console.log('update:', response.status, data);

    if (!response.ok) {
        return;
    }

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
    const response = await apiFetch('/api/todos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: title,
      }),
    });

    const data = await response.json();

    console.log('create:', response.status, data);

    if (!response.ok) {
        return;
    }

    setTitle('');
    fetchTodos();
  };

  // ログイン成功後にTodoを取得
  useEffect(() => {
      if (isLoggedIn) {
          fetchTodos();
      }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>ログイン済み</h1>
          {/** */}
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

      <input
        value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "200px" }}
      />
      <button onClick={createTodo} style={{ width: "200px" }}>
        追加
      </button>

    </>
        ) : (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
    </>

  );
}

export default App
