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
  const { title, content, slug, description } = req.body;

  const authorId = req.userId!; //we get the userId as a token that was decoded using authMiddleware

  if (!title || !content || !slug || !description) {
    return res.status(400).json({
      message: "title, content, category and description are required",
    });
  }

  try {
    const postResult = await createPost({ title, content, slug, authorId, description });
    return res.status(200).json(postResult);
  } catch (error) {
    return res.status(400).json({ message: "error posting!" });
  }
});

//route to get all the posts -
router.get("/", async (req: Request, res: Response) => {


  try {
    const categorySlug = req.query.category as string | undefined; //grabbing the query (category) from the url eg- category?=defi

      //for optional filters (to filter for the 'latest posts' section)
    const limit = req.query.limit

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



router.put(
  "/:postId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { title, content, description } = req.body;
    const { postId } = req.params;
    const userId = req.userId; //id of the person logged in

    if (!title && !content && !description) {
      return res
        .status(400)
        .json({ message: "please provide title, content or description to update" });
    }
    if (!postId) {
      return res.status(400).json({ message: "POST ID is required" });
    }
    try {
      const existingPost = await getSinglePost(postId);
      if (!existingPost) {
        return res.status(400).json({ message: "post not found" });
      }

      //debugging check for existing logs in terminal-
      console.log("------------------------");
      console.log("attempting edit");
      console.log("logged in user:", userId);
      console.log("post author: ", existingPost.authorId);

      //shield guard - if ids dont match, block them
      if (existingPost.authorId !== userId) {
        console.log("ACCESS DENIED");
        return res
          .status(403)
          .json({ message: "you are not authorised to edit this" });
      }

      const updatedPostResult = await updatePost(postId, { title, content, description });
      return res.status(200).json(updatedPostResult);
    } catch (error) {
      console.error("updated error - ", error);
      return res.status(500).json({ message: "could not update the post :(" });
    }
  }
);

export default router;
