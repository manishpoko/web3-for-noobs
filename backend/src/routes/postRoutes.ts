import { Router } from "express";
import type { Request, Response } from "express";

import { createPost } from "../db/post.ts";

const router = Router();


// full path for the below router  will be - /api/posts/create
router.post('/create', async (req: Request, res: Response) => {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.body.authorId;

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