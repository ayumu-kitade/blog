'use client'
import { useState, useActionState } from "react"
import ReactMarddown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import TextareaAutosize from "react-textarea-autosize"
import "highlight.js/styles/github.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createPostPage } from "@/lib/actions/createPost"

export default function CreatePostPage() {
    const [content, setContent] = useState("")
    const [contentLength, setContentLength] = useState(0)
    const [preview, setPreview] = useState(false)
    const [state, formAction] = useActionState(createPostPage, {success: false, errors: {}})
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" name="title" type="text" placeholder="タイトルを入力してください" />
                    {state.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input id="topImage" name="topImage" type="file" accept="image/*" />
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.topImage[0]}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="content">内容</Label>
                    <TextareaAutosize id="content" name="content" className="w-full border p-2" placeholder="Markdown形式で入力してください" minRows={8} value={content} onChange={handleContentChange} />
                    {state.errors.content && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
                    )}
                </div>
                <div className="absolute right-2 text-xs text-gray-500">
                    文字数: {contentLength}
                </div>
                <div>
                    <Button type="button" onClick={() => setPreview(!preview)}>
                        {preview ? "プレビューを閉じる" : "プレビューを表示"}
                    </Button>
                </div>
                <div>
                    {preview && (
                        <div className="border p-4 bg-gray-50 prose max-w-none">
                            <ReactMarddown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} skipHtml={false} unwrapDisallowed={true}>
                                {content}
                            </ReactMarddown>
                        </div>
                    )}
           
                    <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        投稿する
                    </Button>
                </div>
            </form>
        </div>
    )
}