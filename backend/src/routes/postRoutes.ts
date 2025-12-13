import { Router } from "express";
import type { Request, Response } from "express";

import { createPost } from "../db/post.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { AuthRequest } from "../middleware/authMiddleware.ts";

const router = Router();


// full path for the below router  will be - /api/posts/create
router.post('/create', authMiddleware, async (req: AuthRequest, res: Response) => {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.userId!; //we get the userId as a token that was decoded using authMiddleware

    if(!title || !content || !authorId ) {
        return res.status(400).json({
            message: "please fill the required details"
        })
    }

    try {
        const postResult = await createPost({title, content, authorId});
        return res.status(200).json(postResult)

    } catch (error) {
        return res.status(400).json({message: 'error posting!'})
        
    }


})

export default router