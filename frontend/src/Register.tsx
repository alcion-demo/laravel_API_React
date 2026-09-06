import { useState } from 'react';
import { apiFetch } from './utils/apiFetch';

type RegisterProps = {
  onRegisterSuccess: (user: any) => void;
  onBackToLogin: () => void;
};

const Register = ({ onRegisterSuccess, onBackToLogin }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleRegister = async () => {
    try {
      await apiFetch('/sanctum/csrf-cookie');

      const response = await apiFetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      console.log('register:', response.status, data);

      if (!response.ok) {
        if (response.status === 422) {
          setErrors(data.errors);
          return;
        }

        setErrors('登録に失敗しました');
        return;
      }

      const userResponse = await apiFetch('/api/user');

      console.log('register user status:', userResponse.status);

      const user = await userResponse.json();

      console.log('registered user:', user);

      onRegisterSuccess(user);

    } catch (error) {
      console.error('register error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">REGISTER</h1>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <label className="min-w-[100px] shrink-0 text-left text-sm text-gray-700">
                名前
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>
            {errors.name?.[0] && <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <label className="min-w-[100px] shrink-0 text-left text-sm text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>
            {errors.email?.[0] && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <label className="min-w-[100px] shrink-0 text-left text-sm text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>
            {errors.password?.[0] && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <label className="min-w-[100px] shrink-0 text-left text-sm text-gray-700">
                パスワード確認
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>
            {errors.password?.[0] && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleRegister}
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            新規登録
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onBackToLogin}
            className="text-sm text-blue-500 hover:underline focus:outline-none"
          >
            ログイン画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;