import { getOwnPost } from "@/lib/ownPosts"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { auth } from "@/auth"
import ReactMarddown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

type Params = { params: Promise<{ id: string }> }

export default async function ShowPage({ params }: Params) {
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.email || !userId) {
        throw new Error("不正なアクセスです");
    }
    const { id } = await params
    const post = await getOwnPost(userId, id)
    if (!post) {
        notFound()
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto">
                {post.topImage && (
                    <div className="relative w-full h-48">
                        <Image
                            src={post.topImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-t-md"
                            priority
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">投稿者：{post.author.name}</p>
                        <time className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </time>
                    </div>
                    <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <ReactMarddown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} skipHtml={false} unwrapDisallowed={true}>
                            {post.content}
                        </ReactMarddown>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}