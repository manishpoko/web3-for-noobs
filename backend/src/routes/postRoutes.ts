import { Router } from "express";
import type { Request, Response } from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../db/post.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { AuthRequest } from "../middleware/authMiddleware.ts";

const router = Router();

// full path for the below router  will be - /api/posts/create
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const {title, content, slug} = req.body;

  const authorId = req.userId!; //we get the userId as a token that was decoded using authMiddleware

  if (!title || !content || !slug) {
    return res.status(400).json({
      message: "title, content and category are required",
    });
  }

  try {
    const postResult = await createPost({ title, content, slug, authorId });
    return res.status(200).json(postResult);
  } catch (error) {
    return res.status(400).json({ message: "error posting!" });
  }
});

//route to get all the posts -
router.get("/", async (req: Request, res: Response) => {
  try {
    const categorySlug = req.query.category as string | undefined; //grabbing the query (category) from the url eg- category?=defi


    const posts = await getAllPosts(categorySlug);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "error fetching the posts :(" });
  }
});

//route to get one specific post -
router.get("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(400).json({ message: "post Id required" });
  }
  try {
    const singlePost = await getSinglePost(postId);

    if (!singlePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(singlePost);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "error fetching the specified post :( " });
  }
});

//route to delete a post by checking its postId-
router.delete(
  "/:postId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const idToDelete = req.params.postId;
    if (!idToDelete) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    try {
      await deletePost(idToDelete);
      return res.status(200).json({ message: `post deleted!` });
    } catch (error) {
      return res.status(500).json({ message: "could not delete post :( " });
    }
  }
);

//route to update a post (title and/or content)-
router.put("/:postId", authMiddleware, async (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.content;
  if (!title && !content) {
    return res.status(400).json({
      message: "please fill the fields to update",
    });
  }
  const idToUpdate = req.params.postId;
  if (!idToUpdate) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  try {
    const updatedPostResult = await updatePost(idToUpdate, { title, content });
    return res.status(200).json(updatedPostResult);
  } catch (error) {
    return res.status(500).json({ message: "could not update post :( " });
  }
});

export default router;
