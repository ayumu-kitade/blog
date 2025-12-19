'use server';

import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/validations/user';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
  values?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      values: { email: data.email }, 
    };
  }

  const { email, password } = validation.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return {
      success: false,
      errors: { email: ['このメールアドレスは既に登録されています'] },
      values: { email }, 
    };
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: email.split('@')[0],
    },
  });

  redirect('/dashboard');
}