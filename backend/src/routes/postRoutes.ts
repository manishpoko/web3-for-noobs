import { Router } from "express";
import type { Request, Response } from "express";

import { createPost, deletePost, getAllPosts, updatePost } from "../db/post.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { AuthRequest } from "../middleware/authMiddleware.ts";

const router = Router();

// full path for the below router  will be - /api/posts/create
router.post(
  "/create",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.userId!; //we get the userId as a token that was decoded using authMiddleware

    if (!title || !content || !authorId) {
      return res.status(400).json({
        message: "please fill the required details",
      });
    }

    try {
      const postResult = await createPost({ title, content, authorId });
      return res.status(200).json(postResult);
    } catch (error) {
      return res.status(400).json({ message: "error posting!" });
    }
  }
);

//route to get all the posts -
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "error fetching the posts :(" });
  }
});
//route to get one specific post - 






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
