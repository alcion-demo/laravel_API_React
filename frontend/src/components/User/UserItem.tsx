import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type UpdateErrors = {
  name?: string | string[];
  email?: string | string[];
};

type UserItemProps = {
  user: User;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, name: string, email: string) => Promise<UpdateErrors>;
};

const UserItem = ({ user, deleteUser, updateUser }: UserItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editErrors, setEditErrors] = useState<UpdateErrors>({});

  const handleSave = async () => {
    const errors = await updateUser(user.id, name, email);
    setEditErrors(errors || {});

    if (!errors?.email && !errors?.name) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setEditErrors({});
    setIsEditing(false);
  };

  const getErrorMessage = (error?: string | string[]) => {
    if (!error) return null;
    return Array.isArray(error) ? error[0] : error;
  };

  return (
    <div className="border-b border-gray-200 py-4">
      {isEditing ? (
        /* 編集モード：左にフォーム、右にボタン */
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="名前"
              />
              {editErrors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(editErrors.name)}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="メールアドレス"
              />
              {editErrors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(editErrors.email)}
                </p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              保存
            </button>

            <button
              onClick={handleCancel}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        /* 通常モード：左に情報表示、右にボタン */
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">名前：</span>
              {user.name}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">メール：</span>
              {user.email}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => {
                setEditErrors({});
                setIsEditing(true);
              }}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              編集
            </button>

            <button
              onClick={() => {
                if (confirm('このユーザーを削除しますか？')) {
                  deleteUser(user.id);
                }
              }}
              className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;