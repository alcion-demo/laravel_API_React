import { useState } from 'react';

type LoginProps = {
  /** ログイン成功時に呼び出されるコールバック関数 */
  onLoginSuccess: () => void;
};

const Login = ({ onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getXsrfToken = () => {
        const match = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='));

        return match ? decodeURIComponent(match.split('=')[1]) : '';
    };

    //ログイン実行のイベントハンドラー
    const handleLogin = async () => {
        try {
            await fetch('http://localhost:8000/sanctum/csrf-cookie', {
                credentials: 'include',
            });

            console.log('csrf ok');
            const xsrfToken = getXsrfToken();

            console.log('xsrf token:', xsrfToken);

            if (!xsrfToken) {
                throw new Error('XSRF-TOKEN cookieが取得できていません');
            }

            // ログイン認証リクエスト（POST）
            const loginResponse = await fetch('http://localhost:8000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            console.log('login status:', loginResponse.status);

            //認証済みユーザー情報の取得
            const userResponse = await fetch(
                'http://localhost:8000/api/user',
                {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );

            console.log('user status:', userResponse.status);

            const user = await userResponse.json();

            console.log('authenticated user:', user);

            //ログイン状態引き渡し
            if (userResponse.ok) {
                onLoginSuccess();
            }

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