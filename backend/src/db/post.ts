//post logic all here - CRUD


import slugify from "../helper/slugify.ts"; //slugify is an old package,mostly compatibe with only cjs, so this is a quick fix to use it here in latest typescript code

import prisma from "./prisma.ts";

interface PostInput {
  title: string;
  content: string;
  authorId: string;
  category: string; //this will be the category filter, eg- a post belonging to "DEFI"
  description: string;
}

export async function createPost(input: PostInput) {
  const { title, content, authorId, description, category } = input;

  //to generate slug from the title (for easy reading in urls and indexes)
  const generateSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      slug: generateSlug, //gets the slug generated
      description,
      category
    },
  });
  return newPost;
}

export async function getAllPosts(categoryFilter?: string, limit?: string) {
  //if user clicks a category, look for it in the 'category' column in database
  const whereClause = categoryFilter ? { category: categoryFilter } : {};

  const allPosts = await prisma.post.findMany({
    where: whereClause, //if empty, it finds all posts regardless of category
    select: {
      postId: true,
      title: true,
      category: true,
      content: true,
      slug: true, //this is for the link in frontend
      createdAt: true,
      description: true,

      author: {
        select: {
          username: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc", //descending (newest on top)
    },

    //apply limit (if it is applicable). we have defined this limit and categoryFilter in postRoutes.ts
    take: limit ? parseInt(limit as string) : undefined,
  });
  return allPosts;
}

export async function getSinglePost(slugIdentifier: string) {
  const singlePost = await prisma.post.findUnique({
    where: {
      slug: slugIdentifier, //checks for the specific slug in the db
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
  return singlePost;
}

//to update a post, we identify the post to update using its id, so for that -
export async function getPostById(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      postId: postId,
    },
  });
  return post;
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
  input: { title?: string; content?: string; description?: string },
) {
  const { title, content, description } = input;
  const updatedPost = await prisma.post.update({
    where: {
      postId: postId,
    },
    data: {
      title: title,
      content: content,
      description: description,
    },
  });
  return updatedPost;
}
