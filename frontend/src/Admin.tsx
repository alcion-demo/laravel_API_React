import { useEffect, useState } from 'react';
import { apiFetch } from './utils/apiFetch';
import UserForm from './components/User/UserForm'
import UserItem from './components/User/UserItem'

type User = {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
};

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<any>({});

  const fetchUsers = async () => {
    const response = await apiFetch('/api/admin/users');

    console.log('admin users:', response.status);

    const data = await response.json();

    console.log('users:', data);

    if (!response.ok) {
      return;
    }

    setUsers(data);
  };
    useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    const response = await apiFetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log('delete user:', response.status, data);

    if (!response.ok) {
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  const updateUser = async (
    id: number,
    name: string,
    email: string
  ) => {
    const response = await apiFetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    console.log('update user:', response.status, data);

    if (!response.ok) {
      if (response.status === 422) {
        return data.errors ?? {};
      }

      return {};
    }

    // 最新のユーザー一覧を取得
    fetchUsers();

    return {};
  };

  const createUser = async (
    name: string,
    email: string,
    password: string
    ) => {
    
    setErrors({});

    const response = await apiFetch('/api/admin/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log('create user:', response.status, data);

    if (!response.ok) {
      if (response.status === 422) {
        setErrors(data.errors ?? {});
      }
      return;
    }

    setUsers((prevUsers) => [...prevUsers, data]);

  };

  const logout = async () => {
    const response = await apiFetch('/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      console.log('logout error:', response.status);
      return;
    }

    window.location.reload();
  };

  return (
    <>
      <div>
        <h1>Admin画面</h1>

        <UserForm
          createUser={createUser}
          errors={errors}
        />

        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            updateUser={updateUser}
          />
        ))}
      </div>
        <button onClick={logout}>
          ログアウト
        </button>
    </>
  );
};

export default Admin;