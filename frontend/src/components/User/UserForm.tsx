import { useState } from 'react';

type UserFormProps = {
  createUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  errors: any;
};

const UserForm = ({ createUser, errors }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    createUser(name, email, password);
  };

  return (
    <>
      <h2>ユーザー登録</h2>

      <div>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}
      </div>

      <button onClick={handleSubmit}>
        登録
      </button>
    </>
  );
};

export default UserForm;