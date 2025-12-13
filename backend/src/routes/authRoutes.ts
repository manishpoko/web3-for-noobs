import { Router } from "express";
import type { Request, Response } from "express";
import { createUser, loginUser } from "../db/user.ts";
const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ message: "authroutes check" });
});

//defining the signup endpoint, wth password hashing added -

router.post("/signup",  async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;


  if (!email || !password) {
    return res.status(400).json({message: "email and password required for new user!"})
  }
  try {
    const newUserResult = await createUser({email, password, username});
    return res.status(200).json(newUserResult); //this will return a json object with entered details a/t schema of user

  } catch (error) {
    return res.status(400).json({message: (error as Error).message})

    
  }


});

//login logic using email and password - 

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



export default router;
