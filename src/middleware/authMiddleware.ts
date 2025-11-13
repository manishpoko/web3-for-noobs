import type { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
  user?: { id: string };
}

const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  // 1. CHECKING FOR TOKEN IN THE AUTHORIZN HEADER
  // The rest of the synchronous and asynchronous logic remains the same.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2. VERIFY TOKEN (using type assertion for process.env)
      const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);

      // 3. ATTACH USER TO THE REQUEST (using 'as any' to satisfy TS compiler)
      req.user = { id: (decoded as any).id };

      next();
    } catch (error) {
      console.error("token verification failed", error);
      return res
        .status(401)
        .json({ message: "invalid/expired token, no authorization" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "not authorized - no token :(" });
  }
};

// 2. CJS EXPORT (using module.exports)
module.exports = { protect };
