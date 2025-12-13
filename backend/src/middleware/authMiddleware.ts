import type { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "a_fallback_secret_key"


export interface AuthRequest extends Request{
    userId?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(400).json({message: "access denied, no token provided"})
    }


    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(400).json({message: "error: malformed token; access denied!"})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {id: string};

        req.userId = decoded.id;

        
        next()


    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });

        
    }


}