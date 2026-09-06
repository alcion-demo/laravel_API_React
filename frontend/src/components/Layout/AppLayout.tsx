type AppLayoutProps = {
  children: React.ReactNode;
  user: {
    name: string;
  };
  logout: () => void;
};

function AppLayout({ children, user, logout }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">
            Todo App
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.name} さん
            </span>

            <button
              onClick={logout}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;