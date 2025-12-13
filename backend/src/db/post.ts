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
