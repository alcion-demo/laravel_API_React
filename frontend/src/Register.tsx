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
  <div>
      <h1>REGISTER</h1>

      <div>
        <label>
          名前
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name?.[0] && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
        </label>
      </div>

      <div>
        <label>
          メールアドレス
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email?.[0] && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
        </label>
      </div>

      <div>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password?.[0] && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
        </label>
      </div>

      <div>
        <label>
          パスワード確認
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password?.[0] && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
        </label>
      </div>

      <button onClick={handleRegister}>
      新規登録
      </button>
      <button onClick={onBackToLogin}>
        ログイン画面に戻る
      </button>
  </div>
  );
}

export default Register;