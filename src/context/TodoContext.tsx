"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "@/types";

interface TodoContextType {
  todos: TodoItem[];
  addTodo: (
    todo: Omit<TodoItem, "id" | "status"> & { status?: TodoItem["status"] }
  ) => void;
  deleteTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: TodoItem["status"]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  // todosの状態をnullで初期化し、ローカルストレージからの読み込みが終わるまで待つ
  const [todos, setTodos] = useState<TodoItem[] | null>(null); // nullで初期化

  // ローカルストレージからの読み込みと保存は useEffect で行う
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      try {
        setTodos(storedTodos ? JSON.parse(storedTodos) : []); // ここでtodosをセット
      } catch (e) {
        console.error("Failed to parse todos from localStorage:", e);
        setTodos([]); // エラー時は空の配列
      }
    }
  }, []);

  useEffect(() => {
    if (todos !== null && typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (
    newTodo: Omit<TodoItem, "id" | "status"> & { status?: TodoItem["status"] }
  ) => {
    if (todos === null) return;

    const todoWithDefaults: TodoItem = {
      id: uuidv4(),
      status: "未着手",
      ...newTodo,
    };
    setTodos((prevTodos) => [...(prevTodos || []), todoWithDefaults]);
  };

  const deleteTodo = (id: string) => {
    if (todos === null) return;

    setTodos((prevTodos) => (prevTodos || []).filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id: string, status: TodoItem["status"]) => {
    if (todos === null) return;

    setTodos((prevTodos) =>
      (prevTodos || []).map((todo) =>
        todo.id === id ? { ...todo, status: status } : todo
      )
    );
  };

  // todosがまだロード中の場合は、ロード状態のUI（または何も表示しない）をレンダリングする
  if (todos === null) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">ロード中...</p>
      </div>
    );
  }

  // ロード完了後にContext Providerをレンダリング
  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, updateTodoStatus }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
