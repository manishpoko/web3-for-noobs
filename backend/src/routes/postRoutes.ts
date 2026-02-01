import { Router } from "express";
import type { Request, Response } from "express";

//we import all the CRUD functions of our posts here as components
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  getPostById,
  updatePost,
} from "../db/post.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { AuthRequest } from "../middleware/authMiddleware.ts";

const router = Router();

// full path for the below router  will be - /api/posts/create
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { title, content, category, description } = req.body;

  const authorId = req.userId!; //we get the userId as a token that was decoded using authMiddleware

  if (!title || !content || !category || !description) {
    return res.status(400).json({
      message: "title, content, category and description are required",
    });
  }

  try {
    const postResult = await createPost({
      title,
      content,
      category,
      authorId,
      description,
    });
    return res.status(200).json(postResult);
  } catch (error) {
    console.error("create error:", error);
    return res.status(400).json({ message: "error posting!" });
  }
});

//route to get all the posts -
router.get("/", async (req: Request, res: Response) => {
  try {
    const categoryFilter = req.query.category as string; //grabbing the query (category) from the url

    //for optional filters (to filter for the 'latest posts' section)
    const limit = req.query.limit as string; //grabbing the limit from the url

    //query conditions already defined in db/post.ts

    const posts = await getAllPosts(categoryFilter, limit); //both as props here to see whichever applicable
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error fetching the posts :(" });
  }
});

//route to get one specific post (from the slug in url)-
router.get("/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;
  if (!slug) {
    return res.status(400).json({ message: "slug is required" });
  }
  try {
    const singlePost = await getSinglePost(slug);

    if (!singlePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(singlePost);
  } catch (error) {
    console.log("🔥 ---------------------------------------------------");
    console.error("🔥 ERROR DETAILS:");
    console.error(error);
    console.log("🔥 ---------------------------------------------------");
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
  },
);

//route to update a post (by id, not slug)
router.put(
  "/:postId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { title, content, description, category } = req.body;
    const { postId } = req.params;
    const userId = req.userId; //id of the person logged in

    if (!title && !content && !description) {
      return res
        .status(400)
        .json({
          message: "please provide title, content or description to update",
        });
    }
    if (!postId) {
      return res.status(400).json({ message: "POST ID is required" });
    }
    try {
      const existingPost = await getPostById(postId); //we identify the post by its id here(and not slug like other get functions)
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

      const updatedPostResult = await updatePost(postId, {
        title,
        content,
        description,
      });
      return res.status(200).json(updatedPostResult);
    } catch (error) {
      console.error("updated error - ", error);
      return res.status(500).json({ message: "could not update the post :(" });
    }
  },
);

export default router;
