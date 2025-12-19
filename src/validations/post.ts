import { z} from "zod";

export const postSchema = z.object({
    title: z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください"),
    content: z.string().min(1, "内容は必須です"),
    topImage: z.instanceof(File).nullable().optional(),
});