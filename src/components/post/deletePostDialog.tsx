import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogPortal, AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { deletePost } from "@/lib/actions/deletePost";

type DeletePostDialogProps = {
    postId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function DeletePostDialog({ postId, isOpen, onOpenChange }: DeletePostDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogPortal>
                <AlertDialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                <AlertDialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 max-w-sm w-full shadow-lg">
                    <AlertDialogTitle className="text-lg font-bold">記事の削除</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2  text-gray-600">
                        この記事を削除してもよろしいですか？<br />
                        この操作は元に戻せません。
                    </AlertDialogDescription>
                    <div className="flex justify-end mt-4 space-x-2">
                        <AlertDialogCancel className="border rounded-md px-3 py-1.5">キャンセル</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletePost(postId)} className="border bg-red-600 text-white rounded-md px-3 py-1.5">
                            削除する
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    )
}