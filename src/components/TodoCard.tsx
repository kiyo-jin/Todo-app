"use client";

import React, { useState } from "react";
import { TodoItem } from "../types";
import { useTodo } from "../context/TodoContext";
import { FaUser, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

interface TodoCardProps {
  todo: TodoItem;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { deleteTodo, updateTodoStatus } = useTodo();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColorClass = (status: TodoItem["status"]) => {
    switch (status) {
      case "未着手":
        return "bg-gray-200 text-gray-800";
      case "進行中":
        return "bg-blue-200 text-blue-800";
      case "完了":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const isOverdue = (deadline: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today && todo.status !== "完了";
  };

  const formattedDeadline = new Date(todo.deadline).toLocaleDateString(
    "ja-JP",
    {
      month: "numeric",
      day: "numeric",
    }
  );

  return (
    <div
      className={`relative bg-white p-6 rounded-lg shadow-md flex flex-col justify-between
        ${isHovered ? "shadow-lg scale-102" : ""} transition-all duration-300
        ${isOverdue(todo.deadline) ? "border-l-4 border-red-500" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOverdue(todo.deadline) && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          期限切れ
        </span>
      )}

      <h3 className="text-xl font-bold mb-2">{todo.title}</h3>
      <div className="flex items-center text-gray-600 text-sm mb-1">
        <FaUser className="mr-1" />
        <span>{todo.assignee}</span>
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <FaCalendarAlt className="mr-1" />
        <span>{formattedDeadline}</span>
      </div>

      <div
        className={`px-2 py-1 rounded-full text-xs font-semibold self-start ${getStatusColorClass(
          todo.status
        )} mb-4`}
      >
        <select
          value={todo.status}
          onChange={(e) =>
            updateTodoStatus(todo.id, e.target.value as TodoItem["status"])
          }
          className="bg-transparent outline-none cursor-pointer"
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
      </div>

      {todo.content && (
        <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm mb-4">
          <p>{todo.content}</p>
        </div>
      )}

      {isHovered && (
        <button
          onClick={() => deleteTodo(todo.id)}
          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
          aria-label="Delete TODO"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default TodoCard;
