import prisma from "./prisma.ts";

interface PostInput {
  title: string;
  content: string;
  authorId: string;
  slug: string; //this will be the category filter, eg- a post belonging to "DEFI"
}

export async function createPost(input: PostInput) {
  const { title, content, slug, authorId } = input;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      slug,
    },
  });
  return newPost;
}

export async function getAllPosts(categorySlug?: string) {
  //if slug exists, filter by it, otherwise get everything
  const whereClause = categorySlug ? { slug: categorySlug } : {};

  const allPosts = await prisma.post.findMany({
    where: whereClause,
    select: {
      postId: true,
      title: true,
      content: true,
      slug: true, //this is useful here
      createdAt: true,

      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return allPosts;
}

export async function getSinglePost(postId: string) {
  const singlePost = await prisma.post.findUnique({
    where: {
      postId: postId,
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
  return singlePost;
}

export async function deletePost(postId: string) {
  const deletedPost = await prisma.post.delete({
    where: {
      postId: postId,
    },
  });

  return deletedPost;
}

export async function updatePost(
  postId: string,
  input: { title: string; content: string }
) {
  const { title, content } = input;
  const updatedPost = await prisma.post.update({
    where: {
      postId: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return updatedPost;
}
