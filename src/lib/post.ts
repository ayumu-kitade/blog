import { prisma } from "@/lib/prisma";

export async function getAllPublishedPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        include: { author: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getPostById(id: string) {
    return await prisma.post.findUnique({
        where: { id },
        include: { author: { select: { name: true } } },
    });
}

export async function searchPosts(search: string) {
    const decodeSearch = decodeURIComponent(search)
    const normalizedSearch = decodeSearch.replace(/[\s　]+/g, ' ').trim()
    const searchWords = normalizedSearch.split(' ').filter(Boolean)

    const filters = searchWords.map(word => ({
        OR: [
            { title: { contains: word } },
            { content: { contains: word } }
        ]
    }))

    return await prisma.post.findMany({
        where: { AND: filters },
        include: { author: true },
        orderBy: { createdAt: "desc" },
    })
}