// src/routes/auth.ts (Cleaned CJS Structure)

// 1. TYPE IMPORTS (Keep types separate for stability)
import type { Request, Response } from "express"; 

// 2. CJS VALUE IMPORTS (Consolidated and Clean)
const { Router } = require("express");
const jwt = require("jsonwebtoken");

// Service Imports - Destructure the required functions from the service files
const { createUser } = require("../db/user");
const { findUserByEmail, validateUserLogin } = require("../auth/authService");


// --- ROUTER SETUP ---
const router = Router(); 

// --- POST /register (Creates a new user) ---
router.post('/register', async(req: Request, res: Response) => {
 try {
 const {email, password, name} = req.body;
 
        if (!email || !password || !name) {
            return res.status(400).json({error: "Missing required fields: email, password, and name."});
        }

 const newUser = await createUser({email, password, name})
 
 res.status(201).json({ // Changed status to 201 Created
 message: "User registered successfully.",
 user: {id: newUser.id, email: newUser.email, name: newUser.name}
 });

 } catch (error) {
 if(typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
 return res.status(409).json({error: "email already registered brotther!"})
 }
 res.status(500).json({message: "internal server error, sorry darling :("})
 }
});

// --- POST /login (validates user and generates jwt) ---
router.post('/login', async( req: Request, res: Response) => {
 try {
 const {email, password} = req.body;

 const isValid = await validateUserLogin(email, password);

 if (!isValid) {
 return res.status(401).json({message: "invalid credentials"})
 };
 
 const user = await findUserByEmail(email); 

        if (!user) {
             return res.status(404).json({message: "User data missing after validation."});
        }

 const token = jwt.sign(
     {id: user.id}, 
     process.env.JWT_SECRET as string, 
     {expiresIn: '1h'}
 );

 res.status(200).json({message: "login successful", token: token,
 user: {id: user.id, name: user.name, email: user.email}
 })

 } catch (error) {
 console.error('login error',error)
 res.status(500).json({message: "internal server error during loggin you in brother, pls come back later"})
 }
});

// CJS Export
module.exports = router;