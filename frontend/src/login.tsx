import { useState } from 'react';
import { apiFetch } from './utils/apiFetch';

type LoginProps = {
  /** ログイン成功時に呼び出されるコールバック関数 */
  onLoginSuccess: () => void;
};

const Login = ({ onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //ログイン実行のイベントハンドラー
    const handleLogin = async () => {
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
                return;
            }

            //認証済みユーザー情報の取得
            const userResponse = await apiFetch('/api/user');

            console.log('user status:', userResponse.status);

            const user = await userResponse.json();

            console.log('authenticated user:', user);

            onLoginSuccess();


        } catch (error) {
            console.error('login error:', error);
        }
    };

    return (
        <div>
                    <h1>LOGIN TEST</h1>
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

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;