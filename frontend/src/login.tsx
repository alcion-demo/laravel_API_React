import { useState } from 'react';
import { apiFetch } from './utils/apiFetch';

type User = {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
};

type LoginProps = {
  /** ログイン成功時に呼び出されるコールバック関数 */
  onLoginSuccess: (userData: User) => void;
  // 新規登録画面へ移動
  onRegister: () => void;
};

const Login = ({ onLoginSuccess, onRegister }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //ログイン実行のイベントハンドラー
  const handleLogin = async () => {
    setError('');
    try {
        await apiFetch('/sanctum/csrf-cookie');

        console.log('csrf ok');

        // ログイン認証リクエスト（POST）
        const loginResponse =  await apiFetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        console.log('login status:', loginResponse.status);

        if (!loginResponse.ok) {
            const data = await loginResponse.json();
            console.log('login error:', data);
            setError('メールアドレスまたはパスワードが違います');
            return;
        }

        //認証済みユーザー情報の取得
        const userResponse = await apiFetch('/api/user');

        console.log('user status:', userResponse.status);

        const user = await userResponse.json();

        console.log('authenticated user:', user);

        onLoginSuccess(user);


    } catch (error) {
        console.error('login error:', error);
    }
  };

  return (
    <div>
        <h1>LOGIN</h1>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleLogin}>
            Login
        </button>
        <button onClick={onRegister}>
            新規登録
        </button>
    </div>
  );
}

export default Login;