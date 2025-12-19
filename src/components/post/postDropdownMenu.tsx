'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import DeletePostDialog from "./deletePostDialog"
import Link from 'next/link'

export default function PostDropdownMenu({ postId }: { postId: string }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const handleDeleteDialogChange = (open: boolean) => {
        setShowDeleteDialog(open)
        if (!open) {
            setIsDropdownOpen(false)
        }
    }
    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger className='px-2 py-1 border rounded-md'>
                    …
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href={`/manage/posts/${postId}`}>詳細</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/manage/posts/${postId}/edit`}>編集</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-red-600 cursor-pointer' onSelect={() => {
                        setIsDropdownOpen(false)
                        setShowDeleteDialog(true)
                    }}>削除</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {
                showDeleteDialog && (
                    <DeletePostDialog
                        postId={postId}
                        isOpen={showDeleteDialog}
                        onOpenChange={handleDeleteDialogChange}
                    />
                )
            }
        </>
    )
}
