import { getAllPublishedPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import  { Post } from "@/types/post"

type SearchParams = { search?: string }

export default async function Home({ searchParams }:{searchParams: Promise<SearchParams>}) {
    const resolvedParams = await searchParams
    const query = resolvedParams.search || ''
    const posts = query ? await searchPosts(query) as Post[] : await getAllPublishedPosts() as Post[]
    return (
        <>
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
        </>
    )
}