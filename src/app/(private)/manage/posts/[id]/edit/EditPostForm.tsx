'use client'

import { useState, useActionState, useEffect } from "react"
import ReactMarddown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import TextareaAutosize from "react-textarea-autosize"
import "highlight.js/styles/github.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { updatePost } from "@/lib/actions/updatePost"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type EditPostFormProps = {
    post: {
        id: string
        title: string
        content: string
        topImage?: string | null
        published: boolean
    }
}

export default function EditPostForm({ post }: EditPostFormProps) {
    const [content, setContent] = useState(post.content)
    const [contentLength, setContentLength] = useState(0)
    const [preview, setPreview] = useState(false)
    const [title, setTitle] = useState(post.title)
    const [published, setPublished] = useState(post.published)
    const [imagePreview, setImagePreview] = useState(post.topImage)

    const [state, formAction] = useActionState(updatePost, { success: false, errors: {} })
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview !== post.topImage) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview, post.topImage])
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" name="title" type="text" placeholder="タイトルを入力してください" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {state.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input id="topImage" name="topImage" type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                        <div className="mt-2 relative w-full h-48">
                            <Image src={imagePreview} alt={post.title} width={0} height={0} sizes="200px" className="w-[200px]" priority />
                        </div>
                    )}
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
                    <RadioGroup value={published.toString()} name="published" onValueChange={(value) => setPublished(value === "true") }>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="published-one" />
                            <Label htmlFor="published-one">表示</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="published-two" />
                            <Label htmlFor="published-two">非表示</Label>
                        </div>
                    </RadioGroup>
                    <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        更新する
                    </Button>
                </div>
                <input type="hidden" name="postId" value={post.id} />
                <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
            </form>
        </div>
    )
}