'use client'

import { useActionState } from 'react'
import { authenticate } from '@/lib/actions/authenticate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate,undefined)
    return (
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">パスワード</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "ログイン中..." : "ログイン"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}