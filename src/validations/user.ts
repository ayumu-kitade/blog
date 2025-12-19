import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().min(1, 'メールアドレスは必須です').email('無効なメールアドレスです'),
  password: z.string().min(1, 'パスワードは必須です').min(6, 'パスワードは最低6文字以上である必要があります'),
  confirmPassword: z.string().min(1, '確認用パスワードは必須です')
}).refine(data => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword']
});