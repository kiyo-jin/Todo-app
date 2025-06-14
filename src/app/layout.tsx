import "@/app/globals.css";
import { Inter } from "next/font/google";
import { TodoProvider } from "../context/TodoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO管理アプリ",
  description: "チームタスク管理アプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <TodoProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-emerald-100  to-white text-gray-800 p-4 shadow-md">
              <div className="container mx-auto">
                <h1 className="text-3xl font-bold">TODO管理</h1>
                <p className="text-sm">タスクの可視化と効率化</p>
              </div>
            </header>
            <main className="container mx-auto p-4 py-8">{children}</main>
          </div>
        </TodoProvider>
      </body>
    </html>
  );
}
