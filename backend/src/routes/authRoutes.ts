import { Router } from "express"
import type { Request, Response } from "express"
import prisma from '@prisma/client'

import bcrypt from 'bcrypt'
import type { PrismaClient } from "@prisma/client/extension";

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({message: "authroutes check"})
})

router.post('/login', (req: Request, res: Response)=> {
    res.json({message: "this is the login page"})
})


//defining the register endpoint, wth password hashing added -

router.post('/register', (req, res) => {
const createUser = () => {
    
}


})






export default router;