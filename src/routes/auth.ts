import { Router, type Request, type Response } from "express";

import { createUser } from "../db/user";
import { validateUserLogin } from "../auth/authService";

//create your router instance now
const router = Router()

//create a new user (POST/REGISTER logic)-

router.post('/register', async(req: Request, res: Response) => {

    try {
        const {email, password, name} = req.body;

        if(!email || !password || !name) {
            return res.status(400).json({error: "missing required fields brother!"})
        }

        //call the already defined function createUser
        const newUser = await createUser({email, password, name})
        res.status(200).json({
            message: "user registered succefully, now go on",
            user: {id: newUser.id, email: newUser.email, name: newUser.name}
        });

        
    } catch (error) {

        // below is a typescript guard check. simply, check if the error is a code (which is a prisma object, is not null) and then check if it is a specific prisma code (here P2002- duplicate entry) ==> if all pass, only then run this error handling logic

        // instead of this simple js error logic - "if (error.code === 'P2002')", we have this ts logic -

        if(typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({error: "email already registered brotther!"})
        }
        res.status(500).json({message: "internal server error, sorry darling :("})
    }
})

// (POST/LOGIN logic) - validates user and generates jwt 

router.post('/login', async( req: Request, res: Response) => {
    try {

        const {email, password} = req.body;

        //validate credentials using existing logic function
        const isValid = await validateUserLogin(email, password);

        if (!isValid) {
            return res.status(401).json({message: "invalid credentials"})
        };

        //now we have to generate the actual jwt token here

        res.status(200).json({message: "login successful"})


        
    } catch (error) {
        res.status(500).json({message: "internal server error during loggin you in brother, pls come back later"})
        
    }

})

export default router