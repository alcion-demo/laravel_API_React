import { useState } from 'react';

type UserFormProps = {
  createUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  errors: any;
  clearErrors: () => void;
};

const UserForm = ({ createUser, errors, clearErrors }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await createUser(name, email, password);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    clearErrors();
    setIsOpen(false);
  };

  return (
    <div className="mt-4">
      {!isOpen ? (
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            ユーザー登録
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
            ユーザー登録
          </h2>

          <div className="flex items-start justify-between gap-4">
            {/* flex-1 のみにして max-w-md を削除（ボタン手前まで広がります） */}
            <div className="flex-1 space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="名前"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors?.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors?.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors?.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password[0]}
                  </p>
                )}
              </div>
            </div>

            {/* ボタン群（右端） */}
            <div className="flex shrink-0 items-center gap-2 pt-0.5">
              <button
                onClick={handleSubmit}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                登録
              </button>
              <button
                onClick={handleCancel}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;