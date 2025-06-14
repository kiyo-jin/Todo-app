import { z } from "zod";

export interface TodoItem {
  id: string; // uuid
  title: string;
  assignee: string;
  deadline: string; //YYYY-MM-DD
  status: "未着手" | "進行中" | "完了";
  content?: string; // 任意項目
}

// Todoフォームの入力値のスキーマ定義
export const todoFormSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です。" }),
  assignee: z.string().min(1, { message: "担当者名は必須です。" }),
  deadline: z
    .string()
    .min(1, { message: "締切日は必須です。" })
    .refine(
      (val) => !isNaN(new Date(val).getTime()), // 有効な日付形式かチェック
      { message: "有効な締切日を入力してください。" }
    ),
  status: z.enum(["未着手", "進行中", "完了"]).default("未着手"),
  content: z.string().optional().nullable(),
});

// todoFormSchema から型を推論
export type TodoFormInputs = z.infer<typeof todoFormSchema>;
