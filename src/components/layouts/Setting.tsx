'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

export default function Setting({ session }: { session: Session }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <Button variant="ghost" className='font-medium'>{session.user?.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
                    ログアウト
                </DropdownMenuItem>
                <DropdownMenuItem>
                    プロフィール設定
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}