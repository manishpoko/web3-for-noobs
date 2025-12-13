import prisma from "./prisma.ts";

interface PostInput {
    title: string
    content: string
    authorId: string
}




export async function createPost(input: PostInput) {
    const {title, content, authorId} = input;

    const newPost = await prisma.post.create({
        data: {
            title, content, authorId
        }
    })
    return newPost

}

export async function getAllPosts() {
    const allPosts = await prisma.post.findMany({
        select: {
            postId: true,
            title: true,
            content: true,
            createdAt: true,

            author: {
                select: {
                    username: true
                }
            }
        }

    })
    return allPosts;
    
}
