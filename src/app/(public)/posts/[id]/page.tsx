import { getPostById } from "@/lib/post"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type Params = { params: Promise<{ id: string }> }

export default async function PostPage({ params }: Params) {
    const { id } = await params
    const post = await getPostById(id)
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
                    {post.content}
                </CardContent>
            </Card>
        </div>
    )
}