"use client";

import React from "react";

import { useTodo } from "@/context/TodoContext";
import { todoFormSchema, TodoFormInputs } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface TodoFormProps {
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onClose }) => {
  const { addTodo } = useTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormInputs>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      assignee: "",
      deadline: "",
      status: "未着手",
      content: "",
    },
  });

  const onSubmit = (data: TodoFormInputs) => {
    addTodo({
      title: data.title,
      assignee: data.assignee,
      deadline: data.deadline,
      status: data.status,
      content: data.content || "",
    });

    reset();
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">新しいTODOを登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            タイトル（必須）:
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="assignee"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            担当者名（必須）:
          </label>
          <input
            type="text"
            id="assignee"
            {...register("assignee")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          />
          {errors.assignee && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.assignee.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            締切日（必須）:
          </label>
          <input
            type="date"
            id="deadline"
            {...register("deadline")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ステータス:
          </label>
          <select
            id="status"
            {...register("status")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.status.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            内容（任意）:
          </label>
          <textarea
            id="content"
            {...register("content")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition duration-300 transform hover:scale-105"
          >
            作成
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
