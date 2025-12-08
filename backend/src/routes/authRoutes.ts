import { Router } from "express"
import type { Request, Response } from "express"

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({message: "authroutes check"})
})

router.post('/login', (req: Request, res: Response)=> {
    res.json({message: "this is the login page"})
})

export default router;