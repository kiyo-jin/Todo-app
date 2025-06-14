"use client";

import React from "react";
import { useTodo } from "../context/TodoContext";
import TodoCard from "./TodoCard";

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div>
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-12">
          <p>TODOはまだ登録されていません。</p>
          <p>新しいTODOを作成しましょう！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
