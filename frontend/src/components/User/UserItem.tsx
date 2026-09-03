import { useState } from 'react';

type UpdateErrors = {
  name?: string;
  email?: string;
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
  
  return (
    <div>
      {isEditing ? (
        <>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div>
            {editErrors.name && (<p style={{ color: "red" }}> {editErrors.name[0]} </p>)}
            {editErrors.email && ( <p style={{ color: "red" }}> {editErrors.email[0]} </p> )}
          </div>

          <button onClick={async () => {
            const errors = await updateUser(user.id, name, email);

            setEditErrors(errors);

            if (!errors.email && !errors.name) {
              setIsEditing(false);
            }
          }}>
            保存
          </button>

          <button onClick={() => {
            setIsEditing(false);
          }}>
            キャンセル
          </button>
        </>
      ) : (

        <>
          <p>名前：{user.name}</p>
          <p>メール：{user.email}</p>

          <div className="user-actions">
            <button onClick={() => {
              setEditErrors({});
              setIsEditing(true);
            }}>
              編集
            </button>

            <button onClick={() => {
              if (confirm('このユーザーを削除しますか？')) {
                deleteUser(user.id);
              }
            }}>
              削除
            </button>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default UserItem;