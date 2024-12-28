import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = "your_jwt_access_secret"; // Replace with your actual secret

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from "Authorization: Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Access token required." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as {
      userId: number;
      email: string;
    };
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    console.error("Error verifying access token:", err);
    res.status(401).json({ message: "Invalid or expired access token." });
  }
};
