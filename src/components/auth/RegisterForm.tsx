'use client'

import { useActionState } from 'react'
import { createUser } from '@/lib/actions/createUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function RegisterForm() {
    const [state, formAction] = useActionState(createUser, {
        success: false, errors:{},values:{}
    })
    return (
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">新規登録</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" name="email" type="email" required defaultValue={state.values?.email ?? ''} />
                        {state.errors?.email && (
                            <p className="text-red-500">{state.errors.email}</p>
                        )}
                        </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">パスワード</Label>
                        <Input id="password" name="password" type="password" required />
                        {state.errors?.password && (
                            <p className="text-red-500">{state.errors.password}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">確認用パスワード</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" required />
                        {state.errors?.confirmPassword && (
                            <p className="text-red-500">{state.errors.confirmPassword}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={state.success}>新規登録</Button>
                    </form>
            </CardContent>
        </Card>
    )
}