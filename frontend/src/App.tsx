import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './login';
import Register from './Register';
import { apiFetch } from './utils/apiFetch';
import TodoForm from './components/Todo/TodoForm'
import TodoList from './components/Todo/TodoList';
import Admin from './Admin';
import type { Todo } from './Types/Todo';
import './App.css'

const App = () => {

  //ログイン状態取得
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [user, setUser] = useState<any>(null);
  const [adminPage, setAdminPage] = useState<'todo' | 'users'>('todo');

  /**
   * todo取得
   */
  const fetchTodos = async () => {
    const response = await apiFetch('/api/todos');

    const data = await response.json();

    console.log('todos:', JSON.stringify(data, null, 2));
    // console.log('todos:', data);
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
  const editTodo = async (id: number, title: string, completed: boolean) => {
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
        completed: completed,
      }),
    });

    const data = await response.json();

    console.log('update:', response.status, data);

    if (!response.ok) {
      if (response.status === 422) {
        return data.errors?.title?.[0] ?? "";
      }
      return;
    }

    //最新のtodo取得
    fetchTodos();
    return ""; "更新に失敗しました"
  };

  /**
   * 登録
   * @returns 
   */
  const createTodo = async (title: string) => {
    const response = await apiFetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    });

    const data = await response.json();

    console.log('create:', response.status, data);

    if (!response.ok) {
      if (response.status === 422) {
        return data.errors?.title?.[0] ?? "";
      }
      return "登録に失敗しました";
    }

    //最新のtodo取得
    fetchTodos();
    return "";
  };

  const logout = async () => {
    const response = await apiFetch('/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      console.log('logout error:', response.status);
      return;
    }

    setIsLoggedIn(false);
  };

  //Laravelにログイン状態を確認
  useEffect(() => {
    const checkLogin = async () => {
      const response = await apiFetch('/api/user');

      console.log('login check:', response.status);

      if (response.ok) {
        const userData = await response.json();

        setUser(userData);
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
    if (showRegister) {
      return <Register
        onRegisterSuccess={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
        }}
        onBackToLogin={() => setShowRegister(false)}
      />
    }

    return (
      <Login
        onLoginSuccess={(userData) => {
          setIsLoggedIn(true);
          setUser(userData);
        }}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  if (user?.is_admin) {
    return (
      <>
        <div className="admin-nav">
          <button onClick={() => setAdminPage('todo')}>
            Todo
          </button>

          <button onClick={() => setAdminPage('users')}>
            ユーザー管理
          </button>
        </div>

        {adminPage === 'users' ? (
          <Admin />
        ) : (
          <>
            <h1>Todoリスト</h1>
            <p>{user?.name} さんでログイン中</p>
            <p>{user?.email}</p>

            <div>
              <span>{user?.name} さんでログイン中</span>
              <button onClick={logout}>
                ログアウト
              </button>
            </div>

            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />

            <TodoForm
              createTodo={createTodo}
            />
          </>
        )}
      </>
    );
  }
}

export default App
