import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './login';
import { apiFetch } from './utils/apiFetch';
import TodoForm from './components/Todo/TodoForm'
import TodoList from './components/Todo/TodoList';
import './App.css'

type Todo = {
    id: number;
    title: string;
};

const App = () => {

  //ログイン状態取得
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  /**
   * todo取得
   */
  const fetchTodos = async () => {
      const response = await apiFetch('/api/todos');

      const data = await response.json();

      console.log('todos:', data);

      setTodos(data);
  };

  /**
   * 削除
   * @param id 
   * @returns 
   */
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

  /**
   * 編集
   * @param id 
   * @returns 
   */
  const editTodo = async (id: number, title: string) => {
    //APIへリクエスト送信(apiFetch)、APIから返ってきたresponseを取得
    const response = await apiFetch(`/api/todos/${id}`, {
      method: "PUT",
      //リクエストの形式をJSONに指定
      headers: {
        "Content-Type": "application/json",
      },
      // APIへ送信するデータ
      body: JSON.stringify({
        title: title,
      }),
    });

    const data = await response.json();

    console.log('update:', response.status, data);

    if (!response.ok) {
      if (response.status === 422) {
        setEditError(data.errors?.title?.[0] ?? "");
      }
        return;
    }

    //todoではなく編集中のid初期化
    setEditingId(null);
    setTitle("");

    //最新のtodo取得
    fetchTodos();
  };

  /**
   * キャンセル
   */
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setEditError("");
  };

  /**
   * 登録
   * @returns 
   */
  const createTodo = async () => {
    setError("");

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
        if (response.status === 422) {
            setError(data.errors?.title?.[0] ?? "");
        }
        return;
    }

    //タイトル初期化
    setTitle('');

    //最新のtodo取得
    fetchTodos();
  };

  //Laravelにログイン状態を確認
  useEffect(() => {
      const checkLogin = async () => {
          const response = await apiFetch('/api/user');

        console.log('login check:', response.status);

        if (response.ok) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
      checkLogin();
  }, []);

  // ログイン成功後にTodoを取得
  useEffect(() => {
      if (isLoggedIn) {
          fetchTodos();
      }
  }, [isLoggedIn]);

  //ログイン状態確認により、画面描画決定
  if (isLoggedIn === null) {
    return <div>確認中...</div>;
  }

  if (!isLoggedIn) {
      return (
          <Login
              onLoginSuccess={() => setIsLoggedIn(true)}
          />
      );
  }

  return (
    <>
      {/** ログイン済み */}
      {isLoggedIn ? (
        <>
          <h1>ログイン済み</h1>

          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />

          {/** 繰り返しここまで */}

          <TodoForm
            title={title}
            setTitle={setTitle}
            error={error}
            createTodo={createTodo}
          />
        </>

      //ログイン済み状態にする
      ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App
