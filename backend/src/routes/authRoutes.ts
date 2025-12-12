import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../db/prisma.ts";
import bcrypt from "bcrypt";
import { loginUser } from "../db/user.ts";
import jwt from 'jsonwebtoken'
const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ message: "authroutes check" });
});

router.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password){
    return res.status(400).json({
      message: "error receiving the login details"
    })
  }

  try {
      const result = await loginUser({email, password});
      return res.status(200).json(result) //we return the result to the user (which is the jwt token we get from the loginUser function's output)
    
  } catch (error){
    return res.status(400).json({message: (error as Error).message})
    
  }

  
  //jwt verification will be done using middlewares, this is just signing and ensuring correct routing




});

//defining the register endpoint, wth password hashing added -

router.post("/register", (req, res) => {
  const createUser = () => {};
});

export default router;
