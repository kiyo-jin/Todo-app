"use client";

import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const ClientPageWrapper: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
        >
          {showForm ? "フォームを非表示" : "新規TODOを作成"}
        </button>
      </div>
      {showForm && <TodoForm onClose={() => setShowForm(false)} />}
      <TodoList />
    </div>
  );
};

export default ClientPageWrapper;
